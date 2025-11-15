import { createContext, useContext, useReducer, useEffect } from 'react';
import { 
  getSelectedLanguage, 
  setSelectedLanguage,
  getChecklistProgress,
  toggleTopicCompletion,
  resetAllProgress,
  getNotes,
  setNotes,
  setLastSavedTimestamp
} from '../utils/localStorage';

const AppContext = createContext();

const initialState = {
  selectedLanguage: 'javascript',
  checklistProgress: {},
  notes: '',
  activeView: 'javascript', // 'javascript', 'notes'
};

function appReducer(state, action) {
  switch (action.type) {
    case 'INITIALIZE_STATE':
      return {
        ...state,
        selectedLanguage: action.payload.selectedLanguage,
        checklistProgress: action.payload.checklistProgress,
        notes: action.payload.notes,
        activeView: action.payload.selectedLanguage,
      };
    case 'SET_SELECTED_LANGUAGE':
      setSelectedLanguage(action.payload);
      return {
        ...state,
        selectedLanguage: action.payload,
        activeView: action.payload,
      };
    case 'SET_ACTIVE_VIEW':
      return {
        ...state,
        activeView: action.payload,
      };
    case 'TOGGLE_TOPIC': {
      console.log('Reducer: TOGGLE_TOPIC action received for:', action.payload);
      console.log('Reducer: current state:', state.checklistProgress);
      const updatedProgress = toggleTopicCompletion(action.payload);
      console.log('Reducer: updated progress:', updatedProgress);
      return {
        ...state,
        checklistProgress: updatedProgress,
      };
    }
    case 'RESET_PROGRESS': {
      const resetProgress = resetAllProgress();
      return {
        ...state,
        checklistProgress: resetProgress,
      };
    }
    case 'UPDATE_NOTES':
      setNotes(action.payload);
      setLastSavedTimestamp();
      return {
        ...state,
        notes: action.payload,
      };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Initialize state from localStorage on app start
    const selectedLanguage = getSelectedLanguage();
    const checklistProgress = getChecklistProgress();
    const notes = getNotes();
    
    console.log('Initializing state with checklistProgress:', checklistProgress);
    
    dispatch({
      type: 'INITIALIZE_STATE',
      payload: {
        selectedLanguage,
        checklistProgress,
        notes,
      },
    });
  }, []);

  const setSelectedLanguageHandler = (language) => {
    dispatch({ type: 'SET_SELECTED_LANGUAGE', payload: language });
  };

  const setActiveView = (view) => {
    dispatch({ type: 'SET_ACTIVE_VIEW', payload: view });
  };

  const toggleTopic = (topicId) => {
    console.log('Context: toggleTopic called with:', topicId);
    console.log('Context: current state before dispatch:', state.checklistProgress);
    dispatch({ type: 'TOGGLE_TOPIC', payload: topicId });
  };

  const resetProgress = () => {
    dispatch({ type: 'RESET_PROGRESS' });
  };

  const updateNotes = (notes) => {
    dispatch({ type: 'UPDATE_NOTES', payload: notes });
  };

  const isTopicCompleted = (topicId) => {
    return !!state.checklistProgress[topicId];
  };

  const value = {
    ...state,
    setSelectedLanguage: setSelectedLanguageHandler,
    setActiveView,
    toggleTopic,
    resetProgress,
    updateNotes,
    isTopicCompleted,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
