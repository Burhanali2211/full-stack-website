#!/bin/bash

# This script helps you retrieve the Vercel configuration details needed for CI/CD

# Make the script executable with: chmod +x scripts/get-vercel-config.sh

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI is not installed. Installing now..."
    npm install -g vercel
fi

# Ensure the user is logged in
echo "Making sure you're logged in to Vercel..."
vercel login

# Get the project link information
echo -e "\n=== Vercel Project Information ==="
echo "Running 'vercel link' to get project details..."
vercel link

# Get project and org IDs and token
echo -e "\n=== Your Vercel Configuration ==="
echo "To find your VERCEL_ORG_ID and VERCEL_PROJECT_ID:"
echo "1. Open the .vercel/project.json file in this directory"
echo "2. You'll see orgId and projectId values"

if [ -f .vercel/project.json ]; then
    echo -e "\nFound project configuration:"
    echo "============================"
    cat .vercel/project.json
    echo "============================"
    
    ORG_ID=$(cat .vercel/project.json | grep -o '"orgId": "[^"]*' | cut -d'"' -f4)
    PROJECT_ID=$(cat .vercel/project.json | grep -o '"projectId": "[^"]*' | cut -d'"' -f4)
    
    echo -e "\nFor GitHub Actions, you need the following secrets:"
    echo "VERCEL_ORG_ID: $ORG_ID"
    echo "VERCEL_PROJECT_ID: $PROJECT_ID"
else
    echo -e "\nCouldn't find .vercel/project.json file. Did vercel link succeed?"
fi

echo -e "\nFor VERCEL_TOKEN:"
echo "1. Go to https://vercel.com/account/tokens"
echo "2. Create a new token with 'Full Account' scope"
echo "3. Copy the token and add it as a GitHub secret"

echo -e "\nSee docs/CICD-SETUP.md for more detailed instructions." 