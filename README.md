# Learning Checkpoint

A modern, production-quality React application for organizing and managing learning resources across different programming languages and technologies.

## 🎯 Project Overview

Learning Checkpoint is a modular learning resource management system built with React and Vite. It provides a clean, intuitive interface for browsing learning materials, managing favorites, and taking notes. The application is designed with extensibility in mind, making it easy to add new language components while maintaining a consistent design system.

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
