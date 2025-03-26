#!/bin/bash

# Ensure Node.js version
echo "Node.js version:"
node -v

# Install dependencies with legacy peer deps
echo "Installing dependencies..."
npm install --legacy-peer-deps

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Build Next.js app
echo "Building Next.js app..."
npm run build

echo "Build process completed!" 