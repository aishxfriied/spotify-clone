#!/bin/bash

echo "🚀 Deploying Spotify Clone to GitHub"
echo "===================================="

# Check if git is configured
if ! git config user.name &> /dev/null; then
    echo "❌ Git not configured. Please run: ./setup-git.sh first"
    exit 1
fi

echo "✅ Git is configured"

# Add all files
echo "📁 Adding files to git..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "Initial commit: Spotify Clone with Next.js

- Modern music streaming interface
- Built with Next.js, React, TypeScript
- Responsive design with mobile support
- Music player with play/pause functionality
- Deployed on Vercel and GitHub Pages
- Ready for production deployment"

echo "✅ Changes committed"

# Check if GitHub CLI is available
if command -v gh &> /dev/null; then
    echo "🔐 GitHub CLI detected"
    
    # Check if user is authenticated
    if gh auth status &> /dev/null; then
        echo "✅ GitHub CLI authenticated"
        
        # Create repository
        echo "📦 Creating GitHub repository..."
        gh repo create spotify-clone --public --description "🎵 Modern Spotify Clone built with Next.js, React, and TypeScript. Features music player, responsive design, and state management." --push
        
        if [ $? -eq 0 ]; then
            echo "✅ Repository created and pushed to GitHub!"
            echo "🌐 Your repository: https://github.com/$(gh api user --jq .login)/spotify-clone"
            echo ""
            echo "🚀 Next steps:"
            echo "1. Go to https://vercel.com"
            echo "2. Import your repository"
            echo "3. Deploy automatically"
            echo ""
            echo "Or enable GitHub Pages:"
            echo "1. Go to repository settings"
            echo "2. Scroll to Pages section"
            echo "3. Select 'GitHub Actions' as source"
        else
            echo "❌ Failed to create repository. Please try manually."
            manual_setup
        fi
    else
        echo "❌ Not authenticated with GitHub CLI"
        echo "Please run: gh auth login"
        manual_setup
    fi
else
    echo "ℹ️  GitHub CLI not available"
    manual_setup
fi

function manual_setup() {
    echo ""
    echo "📋 Manual Setup Instructions:"
    echo "============================="
    echo ""
    echo "1. Go to https://github.com/new"
    echo "2. Create a new repository named 'spotify-clone'"
    echo "3. Make it public"
    echo "4. Don't initialize with README (we already have one)"
    echo "5. Copy the repository URL"
    echo ""
    echo "Then run these commands:"
    echo "git remote add origin https://github.com/YOUR_USERNAME/spotify-clone.git"
    echo "git branch -M main"
    echo "git push -u origin main"
    echo ""
    echo "After pushing, you can:"
    echo "- Deploy to Vercel: https://vercel.com"
    echo "- Enable GitHub Pages in repository settings"
}
