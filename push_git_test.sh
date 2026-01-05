#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

#APP_NAME="bycet_dir_test"
APP_NAME="ashthor_test"

echo "🌿  Renaming branch to main..."
git branch -M main


echo "🔁 Setting remote to TEST repo..."
git remote add origin https://github.com/n2hq/$APP_NAME.git || git remote set-url origin https://github.com/n2hq/$APP_NAME.git



echo "🧪 Switching to 'main' branch..."
git checkout main || git checkout -b main


echo "🔄 Pulling latest changes..."
git pull origin main --allow-unrelated-histories --no-rebase || echo "No existing history to pull"


echo "Deleting build folder..."
rm -rf build/ 2>/dev/null || true

echo "🛠  Building TEST..."
npm run build:test
#npm run build:prod

echo "📦  Staging changes..."
git add .


echo "✅  Committing changes..."
git commit -m "Test: update commit" || echo "⚠️ No changes to commit."

echo "🌿  Renaming branch to main..."
git branch -M main

echo "🚀  Pushing to origin/main..."
git push -u origin main

echo "🎉  Done!"


