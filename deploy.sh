#!/bin/bash

# Spotify Clone Deployment Script
echo "🎵 Spotify Clone Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Please run this script from the project root."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Run linting
echo "🔍 Running linter..."
npm run lint

# Build the project
echo "🏗️  Building project..."
npm run build

# Export static files
echo "📤 Exporting static files..."
npm run export

echo "✅ Build completed successfully!"
echo ""
echo "🚀 Deployment Options:"
echo "1. Vercel: Push to GitHub and connect to Vercel"
echo "2. Netlify: Upload the 'out' folder to Netlify"
echo "3. GitHub Pages: Push to main branch (auto-deploy)"
echo ""
echo "📁 Static files are in the 'out' directory"
echo "🌐 Ready for deployment!"
