import Header from './Header';
import Sidebar from './Sidebar';
import ErrorMessage from './ErrorMessage';
import { useApp } from '../context/AppContext';

function Layout({ children }) {
  const { error, clearError } = useApp();

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto">
          {error && (
            <ErrorMessage 
              message={error} 
              onClose={clearError}
            />
          )}
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
