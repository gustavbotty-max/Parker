#!/bin/bash
# Frame - Video Script Agent Runner
# Usage: ./run-frame.sh [blog-file]

WORKSPACE="/home/gustavjr/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
PERSONA="$WORKSPACE/agents/FRAME.md"

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

echo "🎬 Frame creating video scripts from: $BLOG_FILE"

SLUG=$(basename "$BLOG_FILE" .md)
OUTPUT_FILE="$WORKSPACE/content/scripts/${DATE}-${SLUG}-script.json"

TASK="
Read your persona at $PERSONA

Read the blog post: $BLOG_FILE

Create 2 video scripts:
1. 60-second short for YouTube Shorts/TikTok/Reels
2. 90-second version (if content supports it)

Each script needs:
- Hook (0-3 seconds)
- Visual/audio breakdown by time segment
- On-screen captions
- Props/filming notes
- Clear CTA

Save to: $OUTPUT_FILE
Format as specified in your persona.
"

echo "Task ready for Frame agent"
echo "Output path: $OUTPUT_FILE"
