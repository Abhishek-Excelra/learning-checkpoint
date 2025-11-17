# Learning Checkpoint

A modern, full-stack learning tracker application with category-based questions, built with Node.js, Express, MongoDB, React, and Vite.

## 🎯 Project Overview

Learning Checkpoint is a comprehensive learning resource management system featuring a Node.js backend with MongoDB and a React frontend. It provides CRUD operations for categories and questions, drag-and-drop reordering, favorites system, completion tracking, and database-stored notes.

## 🐳 Quick Start with Docker (Recommended)

The easiest way to run the entire application:

```bash
# Start everything with one command
./start.sh

# Stop everything
./stop.sh
```

**Access the application:**
- 🌐 **Frontend**: http://localhost:8080
- 🔌 **Backend API**: http://localhost:5000
- 🗄️ **MongoDB**: localhost:27017

## 🚀 Docker Commands

```bash
# Start all services
docker compose up -d

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild and start
docker compose up --build -d
```


## Features with AI (Work in progress)

1. When a user doesn't know answer of specific question in that case it will click on beside icon of that question and it will send that question to AI and AI will give answer to that question.

2 User takees note in simple text and once user click on generate .md file that particular text will be generated to .md file in required format. 


## ✨ Features

### Backend
- **Node.js** + **Express** - Server framework
- **MongoDB** + **Mongoose** - Database and ODM
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

### Frontend
- **React** + **Vite** - Frontend framework and build tool
- **React Router** - Client-side routing
- **Context API** - State management
- **TailwindCSS** - Styling
- **@dnd-kit** - Drag and drop functionality
- **Axios** - HTTP client
- **Lucide React** - Icons


## Project Structure

```
learning-checkpoint/
├── server/                 # Backend API
│   ├── config/
│   │   └── database.js    # MongoDB connection
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── .env              # Environment variables
│   ├── package.json
│   └── server.js         # Main server file
├── client/               # Frontend React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── context/      # Context API
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   └── main.jsx      # Entry point
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (Community Server)
- **npm** or **yarn**

## MongoDB Installation

### Option 1: Local Installation

#### macOS (using Homebrew)
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb/brew/mongodb-community
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer and follow the setup wizard
3. Start MongoDB as a Windows service

#### Linux (Ubuntu/Debian)
```bash
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

### Option 2: Docker (Recommended for Development)
```bash
# Run MongoDB in a Docker container
docker run -d -p 27017:27017 --name learning-checkpoint-mongo mongo:latest

### Notes System
- Auto-save functionality with 1-second debounce
- Manual save option available
- Character and line count display
- Last saved timestamp tracking

## 🚀 Deployment

The application is ready for deployment to static hosting services:

1. **Build for production**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your preferred hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - AWS S3 + CloudFront

## 🤝 Contributing

1. Follow the established code style and component patterns
2. Use meaningful commit messages
3. Test new features thoroughly
4. Update documentation for new components or features
5. Maintain responsive design principles

## 📝 License

This project is open source and available under the MIT License.

---

**Happy Learning! 🎓**
