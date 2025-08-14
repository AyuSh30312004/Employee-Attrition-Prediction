#!/bin/bash

echo "🔧 Fixing Employee Attrition Prediction Project Errors..."

# Remove node_modules and package-lock.json to ensure clean install
echo "📦 Cleaning existing installations..."
rm -rf node_modules
rm -f package-lock.json

# Install all dependencies
echo "📥 Installing dependencies..."
npm install

# Install any missing peer dependencies
echo "🔗 Installing peer dependencies..."
npm install @types/react@^19 @types/react-dom@^19

# Clear Next.js cache
echo "🧹 Clearing Next.js cache..."
rm -rf .next

# Build the project to check for errors
echo "🏗️ Building project..."
npm run build

echo "✅ All errors should now be fixed!"
echo "🚀 Run 'npm run dev' to start the development server"
