#!/bin/bash

echo "🔧 Git Setup for Spotify Clone"
echo "=============================="

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   - macOS: brew install git"
    echo "   - Or download from: https://git-scm.com/downloads"
    exit 1
fi

echo "✅ Git is installed"

# Get user information
echo ""
echo "Please enter your Git configuration:"
echo ""

read -p "Enter your full name (for Git commits): " GIT_NAME
read -p "Enter your email address: " GIT_EMAIL

# Configure git
git config --global user.name "$GIT_NAME"
git config --global user.email "$GIT_EMAIL"

echo ""
echo "✅ Git configured successfully!"
echo "Name: $GIT_NAME"
echo "Email: $GIT_EMAIL"
echo ""

# Check if GitHub CLI is installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI is installed"
    echo "You can now run: gh auth login"
else
    echo "ℹ️  GitHub CLI not found. You can install it with:"
    echo "   - macOS: brew install gh"
    echo "   - Or download from: https://cli.github.com/"
fi

echo ""
echo "🚀 Next steps:"
echo "1. Run: gh auth login (if GitHub CLI is installed)"
echo "2. Or create repository manually on GitHub.com"
echo "3. Run: ./deploy-to-github.sh"
