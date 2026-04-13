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

cd /workspace

# Set up claude local env
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc && source ~/.bashrc
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc

echo "PostCreate setup complete!"
echo ""
echo "Environment variables loaded from .env"
