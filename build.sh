# This is a build script for Next.js deployment
# It ensures the application is properly built for production

#!/bin/bash

# Install dependencies
echo "Installing dependencies..."
npm install

# Build the Next.js application
echo "Building Next.js application..."
npm run build

# Output success message
echo "Build completed successfully!"
