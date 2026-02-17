#!/bin/bash
# Gustav - Content Pipeline Orchestrator
# Usage: ./orchestrator.sh [command] [options]

WORKSPACE="/home/gustavjr/.openclaw/workspace"
STATE_FILE="$WORKSPACE/pipeline/state.json"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)

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
        update_agent_status "scout" "running"
        
        # Spawn Scout agent via OpenClaw
        openclaw sessions_spawn \
            --agent-id scout \
            --task "Read /home/gustavjr/.openclaw/workspace/agents/SCOUT.md for your persona. Research topic: $TOPIC. Save findings to content/research/${DATE}-findings.md"
        
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
        update_agent_status "quill" "running"
        
        openclaw sessions_spawn \
            --agent-id quill \
            --task "Read /home/gustavjr/.openclaw/workspace/agents/QUILL.md for your persona. Read $RESEARCH_FILE and create a blog post. Save to content/blog/${DATE}-$(basename $RESEARCH_FILE .md).md"
        
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
        update_agent_status "echo" "running"
        
        openclaw sessions_spawn \
            --agent-id echo \
            --task "Read /home/gustavjr/.openclaw/workspace/agents/ECHO.md for your persona. Read $BLOG_FILE and create social media posts. Save to content/social/${DATE}-$(basename $BLOG_FILE .md)-social.json"
        
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
        update_agent_status "frame" "running"
        
        openclaw sessions_spawn \
            --agent-id frame \
            --task "Read /home/gustavjr/.openclaw/workspace/agents/FRAME.md for your persona. Read $BLOG_FILE and create video scripts. Save to content/scripts/${DATE}-$(basename $BLOG_FILE .md)-script.json"
        
        update_agent_status "frame" "completed"
        add_to_history "frame_script" "completed"
        log "${GREEN}✓ Frame completed${NC}"
        ;;
    
    "pipeline")
        TOPIC="${2:-financial planning for middle-class families}"
        log "🚀 Starting full pipeline: $TOPIC"
        
        $0 run-scout "$TOPIC"
        sleep 2
        $0 run-quill
        sleep 2
        $0 run-echo
        sleep 2
        $0 run-frame
        
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
with open('$STATE_FILE', 'w') as f:
    json.dump(state, f, indent=2)
EOF
        log "${GREEN}✓ All agents reset to idle${NC}"
        ;;
    
    "help"|*)
        echo "Gustav Content Pipeline Orchestrator"
        echo ""
        echo "Commands:"
        echo "  status              Show current pipeline status"
        echo "  run-scout [topic]   Run research agent"
        echo "  run-quill [file]    Run writer agent"
        echo "  run-echo [file]     Run social content agent"
        echo "  run-frame [file]    Run video script agent"
        echo "  pipeline [topic]    Run full pipeline"
        echo "  dashboard           Open visual dashboard"
        echo "  reset               Reset all agent statuses"
        echo "  help                Show this help"
        echo ""
        echo "Examples:"
        echo "  ./orchestrator.sh run-scout 'NC housing market trends'"
        echo "  ./orchestrator.sh pipeline 'retirement planning changes 2025'"
        ;;
esac