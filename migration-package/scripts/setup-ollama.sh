#!/bin/bash
# Ollama Setup Script for VPS Migration
# Run as root or with sudo

echo "🚀 Setting up Ollama on VPS..."

# Update system
echo "Updating system packages..."
apt update && apt upgrade -y

# Install dependencies
echo "Installing dependencies..."
apt install -y curl wget git build-essential

# Install Ollama
echo "Installing Ollama..."
curl -fsSL https://ollama.ai/install.sh | sh

# Start Ollama service
systemctl start ollama
systemctl enable ollama

# Create models directory
mkdir -p /opt/ollama/models

# Test installation
echo "Testing Ollama installation..."
ollama --version

# Download recommended models
echo "Downloading recommended models..."
echo "This will take 10-20 minutes per model..."

# Model 1: Qwen2.5-72B (best for financial reasoning)
echo "Downloading Qwen2.5-72B-Instruct..."
ollama pull qwen2.5:72b-instruct-q3_K_M

# Model 2: Llama3.1-70B (excellent for web development)
echo "Downloading Llama3.1-70B-Instruct..."
ollama pull llama3.1:70b-instruct-q3_K_M

# Model 3: Mixtral-8x7B (good balance)
echo "Downloading Mixtral-8x7B-Instruct..."
ollama pull mixtral:8x7b-instruct-q3_K_M

# Create systemd service for auto-start
echo "Creating systemd service..."
cat > /etc/systemd/system/ollama-enhanced.service << EOF
[Unit]
Description=Ollama Service with Enhanced Configuration
After=network.target

[Service]
Type=simple
User=ollama
Group=ollama
ExecStart=/usr/local/bin/ollama serve
Restart=always
RestartSec=10
Environment="OLLAMA_HOST=0.0.0.0:11434"
Environment="OLLAMA_ORIGINS=*"
Environment="OLLAMA_MODELS=/opt/ollama/models"

[Install]
WantedBy=multi-user.target
EOF

# Enable and start enhanced service
systemctl daemon-reload
systemctl enable ollama-enhanced.service
systemctl start ollama-enhanced.service

echo "✅ Ollama setup complete!"
echo "📊 Models available:"
echo "  - Qwen2.5-72B: Best for financial reasoning"
echo "  - Llama3.1-70B: Excellent for web development"
echo "  - Mixtral-8x7B: Good speed/capability balance"
echo ""
echo "🌐 API endpoint: http://localhost:11434"
echo "📁 Models directory: /opt/ollama/models"