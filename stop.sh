#!/bin/bash

echo "🛑 Stopping Learning Checkpoint Application..."
echo "=============================================="

# Stop all services
docker compose down

echo "✅ All services stopped!"
echo ""
echo "💡 To start again, run: ./start.sh"
