#!/bin/bash
echo "Starting HSIL Experience Sandbox..."

# Check for API Key
if [ -z "$GROQ_API_KEY" ]; then
  echo "WARNING: GROQ_API_KEY is not set. The app will run in fallback simulation mode."
fi

# Start Backend
cd server
npm install
node index.js &
SERVER_PID=$!
echo "Backend running on PID $SERVER_PID"

# Start Frontend
cd ../client
npm install
npm run dev

# Cleanup
kill $SERVER_PID
