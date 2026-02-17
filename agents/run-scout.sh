#!/bin/bash
# Scout - Research Agent Runner
# Usage: ./run-scout.sh [topic]

WORKSPACE="/home/gustavjr/.openclaw/workspace"
DATE=$(date +%Y-%m-%d)
TIMESTAMP=$(date +%Y-%m-%dT%H:%M:%S)
OUTPUT_FILE="$WORKSPACE/content/research/${DATE}-findings.md"

# Load agent persona
PERSONA="$WORKSPACE/agents/SCOUT.md"

# Determine research topic
if [ -z "$1" ]; then
    TOPIC="general financial news and trends relevant to middle-class families"
else
    TOPIC="$1"
fi

echo "🔍 Scout starting research on: $TOPIC"
echo "Output: $OUTPUT_FILE"

# Create research task for Scout
TASK="
Read your persona at $PERSONA

Today's research topic: $TOPIC

Your mission:
1. Search for recent financial news, policy changes, or trends
2. Focus on topics relevant to middle-class families in NC Triangle
3. Identify 3-5 key stories worth deeper exploration
4. Write findings to: $OUTPUT_FILE

Use the web_search tool to find current information.
Prioritize: life insurance, retirement, college savings, housing, NC-specific programs

Save your output in the format specified in your persona.
"

echo "Spawning Scout agent..."
# Note: In practice, this would call openclaw sessions_spawn
# For now, we document the intended behavior
echo "Task ready for Scout agent"
echo "Output path: $OUTPUT_FILE"
