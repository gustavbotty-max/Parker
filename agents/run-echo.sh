#!/bin/bash
# Echo - Social Content Agent Runner
# Usage: ./run-echo.sh [blog-file]

WORKSPACE="/home/gustavjr/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
PERSONA="$WORKSPACE/agents/ECHO.md"

# Get blog file
if [ -z "$1" ]; then
    BLOG_FILE=$(ls -t $WORKSPACE/content/blog/*.md 2>/dev/null | head -1)
    if [ -z "$BLOG_FILE" ]; then
        echo "❌ No blog file found. Run Quill first."
        exit 1
    fi
else
    BLOG_FILE="$1"
fi

echo "📱 Echo creating social content from: $BLOG_FILE"

SLUG=$(basename "$BLOG_FILE" .md)
OUTPUT_FILE="$WORKSPACE/content/social/${DATE}-${SLUG}-social.json"

TASK="
Read your persona at $PERSONA

Read the blog post: $BLOG_FILE

Create social media content for:
- Facebook (150-300 words, warm/conversational)
- X/Twitter (main tweet + optional thread)
- LinkedIn (professional tone, 200-500 words)

Each post needs a CTA (calculator link, blog link, or consultation).

Save to: $OUTPUT_FILE
Format as specified in your persona.
"

echo "Task ready for Echo agent"
echo "Output path: $OUTPUT_FILE"
