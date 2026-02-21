#!/bin/bash
# Parker Content Pipeline Orchestrator
# Usage: ./agents/orchestrator.sh [command] [options]
# Or just tell Gustav: "run parker-pipeline" with a topic

WORKSPACE="/home/gustavjr/.openclaw/workspace"
STATE_FILE="$WORKSPACE/pipeline/state.json"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

# ============================================
# MODEL CONFIGURATION - Optimized per agent
# ============================================
# Scout: Grok for real-time trending financial data
MODEL_SCOUT="github-copilot/grok-3-fast"
# Quill: Claude for natural, human writing style  
MODEL_QUILL="github-copilot/claude-sonnet-4"
# Echo: Fast model for quick, punchy social content
MODEL_ECHO="github-copilot/gpt-4o-mini"
# Frame: Claude for structured video scripts with AI generation prompts
MODEL_FRAME="github-copilot/claude-sonnet-4"
# ============================================

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log() {
    echo -e "${BLUE}[$(date '+%H:%M:%S')]${NC} $1"
}

update_agent_status() {
    local agent=$1
    local status=$2
    python3 << EOF
import json
with open('$STATE_FILE', 'r') as f:
    state = json.load(f)
state['agents']['$agent']['status'] = '$status'
state['agents']['$agent']['last_run'] = '$TIMESTAMP'
state['last_updated'] = '$TIMESTAMP'
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
}

add_to_history() {
    local action=$1
    local result=$2
    python3 << EOF
import json
with open('$STATE_FILE', 'r') as f:
    state = json.load(f)
state['history'].insert(0, {
    'timestamp': '$TIMESTAMP',
    'action': '$action',
    'result': '$result'
})
state['history'] = state['history'][:50]  # Keep last 50
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
}

# Commands
case "$1" in
    "status")
        log "📊 Pipeline Status"
        cat $STATE_FILE | python3 -m json.tool
        ;;
    
    "run-scout")
        TOPIC="${2:-general financial news}"
        log "🔍 Starting Scout research on: $TOPIC"
        log "📡 Using agent: scout (Grok - real-time trending access)"
        update_agent_status "scout" "running"
        
        # Scout agent configured with Grok for real-time financial news
        openclaw agent \
            --agent scout \
            --to "scout-$(echo $TOPIC | tr ' ' '-' | cut -c1-30)" \
            --message "You are **Scout**, a Financial News & Research Analyst. Read $WORKSPACE/agents/SCOUT.md for your full persona. Research topic: $TOPIC. Use web_search to find the latest trending financial news on this topic. Save findings to $WORKSPACE/content/research/${DATE}-findings.md"
        
        update_agent_status "scout" "completed"
        add_to_history "scout_research" "completed"
        log "${GREEN}✓ Scout completed${NC}"
        ;;
    
    "run-quill")
        RESEARCH_FILE="${2:-$(ls -t $WORKSPACE/content/research/*.md 2>/dev/null | head -1)}"
        if [ -z "$RESEARCH_FILE" ]; then
            log "${RED}✗ No research file found. Run scout first.${NC}"
            exit 1
        fi
        
        log "📝 Starting Quill writing from: $(basename $RESEARCH_FILE)"
        log "✍️  Using agent: quill (Claude - natural human writing)"
        update_agent_status "quill" "running"
        
        # Quill agent configured with Claude for natural writing
        openclaw agent \
            --agent quill \
            --to "quill-$(date +%s)" \
            --message "You are **Quill**, a Blog Writer & Content Distiller. Read $WORKSPACE/agents/QUILL.md for your persona. Read $RESEARCH_FILE and create a blog post. Save to $WORKSPACE/content/blog/${DATE}-$(basename $RESEARCH_FILE .md).md"
        
        update_agent_status "quill" "completed"
        add_to_history "quill_write" "completed"
        log "${GREEN}✓ Quill completed${NC}"
        ;;
    
    "run-echo")
        BLOG_FILE="${2:-$(ls -t $WORKSPACE/content/blog/*.md 2>/dev/null | head -1)}"
        if [ -z "$BLOG_FILE" ]; then
            log "${RED}✗ No blog file found. Run quill first.${NC}"
            exit 1
        fi
        
        log "📱 Starting Echo social content from: $(basename $BLOG_FILE)"
        log "⚡ Using agent: echo (GPT-4o - fast, concise)"
        update_agent_status "echo" "running"
        
        # Echo agent configured with GPT-4o for fast social content
        openclaw agent \
            --agent echo \
            --to "echo-$(date +%s)" \
            --message "You are **Echo**, a Social Media Content Creator. Read $WORKSPACE/agents/ECHO.md for your persona. Read $BLOG_FILE and create social media posts. Save to $WORKSPACE/content/social/${DATE}-$(basename $BLOG_FILE .md)-social.json"
        
        update_agent_status "echo" "completed"
        add_to_history "echo_social" "completed"
        log "${GREEN}✓ Echo completed${NC}"
        ;;
    
    "run-frame")
        BLOG_FILE="${2:-$(ls -t $WORKSPACE/content/blog/*.md 2>/dev/null | head -1)}"
        if [ -z "$BLOG_FILE" ]; then
            log "${RED}✗ No blog file found. Run quill first.${NC}"
            exit 1
        fi
        
        log "🎬 Starting Frame video scripts from: $(basename $BLOG_FILE)"
        log "🎥 Using agent: frame (Claude - structured scripts + AI prompts)"
        update_agent_status "frame" "running"
        
        # Frame agent configured with Claude for structured video scripts
        openclaw agent \
            --agent frame \
            --to "frame-$(date +%s)" \
            --message "You are **Frame**, a Video Scriptwriter. Read $WORKSPACE/agents/FRAME.md for your persona. Read $BLOG_FILE and create video scripts. IMPORTANT: For each segment, include 'ai_visual_prompt' fields with detailed prompts suitable for AI video generation tools (Runway, Pika, Sora). Save to $WORKSPACE/content/scripts/${DATE}-$(basename $BLOG_FILE .md)-script.json"
        
        update_agent_status "frame" "completed"
        add_to_history "frame_script" "completed"
        log "${GREEN}✓ Frame completed${NC}"
        ;;
    
    "pipeline")
        TOPIC="${2:-financial planning for middle-class families}"
        log "🚀 Starting full pipeline: $TOPIC"
        
        # Update state for active run
        python3 << EOF
import json
with open('$STATE_FILE', 'r') as f:
    state = json.load(f)
state['active_run'] = '$(echo $TOPIC | tr ' ' '-' | cut -c1-30)'
state['queue'] = ['quill', 'echo', 'frame']
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
        
        $0 run-scout "$TOPIC"
        sleep 2
        $0 run-quill
        sleep 2
        $0 run-echo
        sleep 2
        $0 run-frame
        
        # Mark complete
        python3 << EOF
import json
with open('$STATE_FILE', 'r') as f:
    state = json.load(f)
state['active_run'] = None
state['queue'] = []
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
        
        log "${GREEN}✓ Full pipeline completed!${NC}"
        ;;
    
    "dashboard")
        log "🌐 Opening dashboard..."
        if command -v xdg-open &> /dev/null; then
            xdg-open $WORKSPACE/dashboard.html
        elif command -v open &> /dev/null; then
            open $WORKSPACE/dashboard.html
        else
            log "Open $WORKSPACE/dashboard.html in your browser"
        fi
        ;;
    
    "reset")
        log "🔄 Resetting all agent statuses..."
        python3 << EOF
import json
with open('$STATE_FILE', 'r') as f:
    state = json.load(f)
for agent in state['agents']:
    state['agents'][agent]['status'] = 'idle'
state['active_run'] = None
state['queue'] = []
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
        log "${GREEN}✓ All agents reset to idle${NC}"
        ;;
    
    "help"|*)
        echo "Parker Content Pipeline Orchestrator"
        echo ""
        echo "Commands:"
        echo "  status              Show current pipeline status"
        echo "  run-scout [topic]   Run research agent"
        echo "  run-quill [file]    Run writer agent"
        echo "  run-echo [file]     Run social content agent"
        echo "  run-frame [file]    Run video script agent"
        echo "  pipeline [topic]    Run full pipeline (Scout→Quill→Echo→Frame)"
        echo "  dashboard           Open visual dashboard"
        echo "  reset               Reset all agent statuses"
        echo "  help                Show this help"
        echo ""
        echo "Examples:"
        echo "  ./agents/orchestrator.sh run-scout 'NC housing market trends'"
        echo "  ./agents/orchestrator.sh pipeline 'retirement planning changes 2025'"
        echo ""
        echo "Or just tell Gustav: 'run parker-pipeline on [topic]'"
        ;;
esac
