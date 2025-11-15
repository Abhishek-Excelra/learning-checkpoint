# Learning Checkpoint

A modern, production-quality React application for organizing and managing learning resources across different programming languages and technologies.

## 🎯 Project Overview

Learning Checkpoint is a modular learning resource management system built with React and Vite. It provides a clean, intuitive interface for browsing learning materials, managing favorites, and taking notes. The application is designed with extensibility in mind, making it easy to add new language components while maintaining a consistent design system.

## ✨ Features

- **📚 Language-Specific Resources**: Currently supports JavaScript with placeholders for Node.js and Django
- **⭐ Favorites Management**: Save and organize your favorite learning resources
- **📝 Persistent Notes**: Auto-saving note-taking functionality with localStorage persistence
- **🔍 Search & Filter**: Find resources by title, description, tags, type, or difficulty level
- **📱 Responsive Design**: Optimized for both desktop and mobile devices
- **🎨 Modern UI**: Clean, accessible design with consistent color palette and spacing
- **💾 Local Persistence**: All user data persists between sessions using localStorage

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation & Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd learning-checkpoint
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:7000`

### Available Scripts

- `npm run dev` - Start development server on port 7000
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🏗️ Architecture & Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx      # Top navigation header
│   ├── Sidebar.jsx     # Left navigation sidebar
│   ├── ItemCard.jsx    # Reusable learning item card
│   ├── JavaScriptView.jsx    # JavaScript resources view
│   ├── FavoritesView.jsx     # Favorites management view
│   └── NotesView.jsx         # Notes editor view
├── context/            # React Context for state management
│   └── AppContext.jsx  # Global application state
├── data/              # Static data and content
│   └── javascriptItems.js    # JavaScript learning resources
├── utils/             # Utility functions
│   └── localStorage.js       # localStorage helper functions
├── App.jsx            # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles with Tailwind CSS
```

## 🔧 Technology Stack

- **Frontend Framework**: React 18 with functional components and hooks
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS for utility-first styling
- **State Management**: React Context API with useReducer
- **Data Persistence**: localStorage for client-side data storage
- **Code Quality**: ESLint with React-specific rules

## 🎨 Design System

### Color Palette

- **Primary**: Blue tones (`primary-50` to `primary-700`)
- **Accent**: Purple tones (`accent-50` to `accent-600`)
- **Neutral**: Gray scale (`neutral-50` to `neutral-900`)
- **Semantic**: Green (success), Yellow (warning), Red (error)

### Component Classes

- `.card` - Standard card styling with hover effects
- `.btn-primary` - Primary action buttons
- `.btn-secondary` - Secondary action buttons
- `.nav-item` - Navigation item styling with active states

## 📊 Data Management

### localStorage Keys

The application uses the following localStorage keys for data persistence:

- `lc_selectedLanguage` - Currently selected programming language
- `lc_favorites` - Array of favorited learning items
- `lc_notes` - User's notes content
- `lc_notes_timestamp` - Last saved timestamp for notes

### State Management

The application uses React Context API with a reducer pattern for state management:

- **selectedLanguage**: Currently active language/technology
- **favorites**: Array of favorited items
- **notes**: User's note content
- **activeView**: Current view ('javascript', 'favorites', 'notes')

## 🔄 Adding New Language Components

To add a new programming language or technology (e.g., Python, React, etc.):

1. **Create data file**
   ```javascript
   // src/data/pythonItems.js
   export const pythonItems = [
     {
       id: 'py-1',
       title: 'Python Basics',
       description: 'Introduction to Python syntax',
       tags: ['basics', 'syntax'],
       type: 'lesson',
       difficulty: 'beginner',
       content: '# Python code example...'
     }
   ];
   ```

2. **Create view component**
   ```javascript
   // src/components/PythonView.jsx
   import React from 'react';
   import { pythonItems } from '../data/pythonItems';
   import ItemCard from './ItemCard';

   export default function PythonView() {
     // Similar structure to JavaScriptView.jsx
   }
   ```

3. **Update navigation**
   ```javascript
   // In src/components/Sidebar.jsx, add to navigationItems array:
   {
     id: 'python',
     label: 'Python',
     icon: <PythonIcon />,
     enabled: true,
   }
   ```

4. **Update main app**
   ```javascript
   // In src/App.jsx, add case to renderMainContent():
   case 'python':
     return <PythonView />;
   ```

### Maintaining Design Consistency

- Use existing Tailwind CSS classes and component styles
- Follow the established card layout pattern in `ItemCard.jsx`
- Maintain the same data structure for learning items
- Use consistent icons from the same icon set (Heroicons)
- Follow the established color palette and spacing system

## 🎯 Item Data Structure

Each learning item should follow this structure:

```javascript
{
  id: 'unique-id',           // Unique identifier
  title: 'Item Title',       // Display title
  description: 'Brief description of the item',
  tags: ['tag1', 'tag2'],    // Array of relevant tags
  type: 'lesson',            // 'lesson', 'snippet', or 'exercise'
  difficulty: 'beginner',    // 'beginner', 'intermediate', or 'advanced'
  content: 'Code example or detailed content'
}
```

## 🔍 Features in Detail

### Search & Filtering
- **Search**: Searches across titles, descriptions, and tags
- **Type Filter**: Filter by lesson, snippet, or exercise
- **Difficulty Filter**: Filter by beginner, intermediate, or advanced

### Favorites System
- Click heart icon to add/remove favorites
- Favorites persist across sessions
- Dedicated favorites view with remove functionality

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
