import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import QuestionsPage from './pages/QuestionsPage';
import FavoritesPage from './pages/FavoritesPage';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<QuestionsPage />} />
            <Route path="/questions" element={<QuestionsPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/notes" element={<NotesPage />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
}

export default App;
