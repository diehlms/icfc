#!/bin/bash

set -e

echo "Running postCreate setup..."

# Load environment variables from .env file
if [ -f /workspace/.env ]; then
    echo "Loading environment variables from .env..."
    export $(grep -v '^#' /workspace/.env | xargs)
else
    echo "Warning: .env file not found at /workspace/.env"
fi

# Navigate to API directory
cd /workspace/api

# Install Ruby dependencies
echo "Installing Ruby gems..."
bundle install

# Ensure debug gem is available globally
echo "Installing debug gem globally..."
gem install debug rdbg

# Set up database
echo "Preparing database..."
rails db:prepare || echo "Database setup failed, but continuing..."

# Navigate to frontend directory
cd /workspace/frontend

# Install Node dependencies (if needed)
if [ -f "package.json" ]; then
    echo "Installing Node.js dependencies..."
    npm install || echo "npm install failed, but continuing..."
fi

cd /workspace

# Set up claude local env
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

echo "PostCreate setup complete!"
echo ""
echo "Installed CLI tools:"
echo "  - Claude Code CLI: claude --version"
echo "  - Node.js version: $(node --version)"
echo "  - npm version: $(npm --version)"
echo ""
echo "Environment variables loaded from .env"
