#!/bin/bash

echo "🚀 Starting Learning Checkpoint Application..."
echo "================================================"

# Stop any existing containers
echo "🛑 Stopping existing containers..."
docker compose down

# Remove existing containers and images (optional - uncomment if you want fresh builds)
# echo "🗑️  Removing old containers and images..."
# docker compose down --rmi all --volumes --remove-orphans

# Build and start all services
echo "🔨 Building and starting all services..."
docker compose up --build -d

# Wait a moment for services to start
echo "⏳ Waiting for services to initialize..."
sleep 10

# Show status
echo "📊 Service Status:"
docker compose ps

echo ""
echo "✅ Application is starting up!"
echo "================================================"
echo "🌐 Frontend: http://localhost:8080"
echo "🔌 Backend API: http://localhost:5000"
echo "🗄️  MongoDB: localhost:27017"
echo "================================================"
echo ""
echo "📝 Useful commands:"
echo "  - View logs: docker compose logs -f"
echo "  - Stop all: docker compose down"
echo "  - Restart: docker compose restart"
echo "  - Rebuild: docker compose up --build"
echo ""
echo "🎉 Happy coding!"
