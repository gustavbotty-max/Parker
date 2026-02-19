#!/bin/bash
# Quill - Writer Agent Runner
# Usage: ./run-quill.sh [research-file]

WORKSPACE="/home/gustavjr/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
PERSONA="$WORKSPACE/agents/QUILL.md"

# Get research file
if [ -z "$1" ]; then
    # Find most recent research file
    RESEARCH_FILE=$(ls -t $WORKSPACE/content/research/*.md 2>/dev/null | head -1)
    if [ -z "$RESEARCH_FILE" ]; then
        echo "❌ No research file found. Run Scout first."
        exit 1
    fi
else
    RESEARCH_FILE="$1"
fi

echo "📝 Quill writing blog post from: $RESEARCH_FILE"

# Generate slug from research filename
SLUG=$(basename "$RESEARCH_FILE" .md | sed 's/-findings//')
OUTPUT_FILE="$WORKSPACE/content/blog/${DATE}-${SLUG}.md"

TASK="
Read your persona at $PERSONA

Read the research file: $RESEARCH_FILE

Write a blog post (600-1000 words) that transforms this research into engaging content.
Use Jonathan's voice: clear, anti-jargon, pro-middle-class.

Save to: $OUTPUT_FILE

Include:
- Relatable hook
- Main insights from research
- Local NC Triangle context
- 2-3 actionable steps
- Soft CTA to schedule consultation
"

echo "Task ready for Quill agent"
echo "Output path: $OUTPUT_FILE"
