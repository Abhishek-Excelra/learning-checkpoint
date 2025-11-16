import { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { categoriesAPI, questionsAPI } from '../services/api';

// Initial state
const initialState = {
  categories: [],
  questions: [],
  favoriteQuestions: [],
  selectedCategory: null,
  loading: false,
  error: null,
  notes: localStorage.getItem('lc_notes') || '',
};

// Action types
const ActionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_CATEGORY: 'ADD_CATEGORY',
  UPDATE_CATEGORY: 'UPDATE_CATEGORY',
  DELETE_CATEGORY: 'DELETE_CATEGORY',
  SET_SELECTED_CATEGORY: 'SET_SELECTED_CATEGORY',
  SET_QUESTIONS: 'SET_QUESTIONS',
  ADD_QUESTION: 'ADD_QUESTION',
  UPDATE_QUESTION: 'UPDATE_QUESTION',
  DELETE_QUESTION: 'DELETE_QUESTION',
  REORDER_QUESTIONS: 'REORDER_QUESTIONS',
  SET_FAVORITE_QUESTIONS: 'SET_FAVORITE_QUESTIONS',
  SET_NOTES: 'SET_NOTES',
};

// Reducer
const appReducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case ActionTypes.SET_CATEGORIES:
      return { ...state, categories: action.payload, loading: false };
    
    case ActionTypes.ADD_CATEGORY:
      return { 
        ...state, 
        categories: [...state.categories, action.payload],
        loading: false 
      };
    
    case ActionTypes.UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map(cat => 
          cat._id === action.payload._id ? action.payload : cat
        ),
        loading: false
      };
    
    case ActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(cat => cat._id !== action.payload),
        selectedCategory: state.selectedCategory?._id === action.payload ? null : state.selectedCategory,
        loading: false
      };
    
    case ActionTypes.SET_SELECTED_CATEGORY:
      // Save to localStorage
      if (action.payload) {
        localStorage.setItem('lc_selectedCategory', action.payload._id);
      } else {
        localStorage.removeItem('lc_selectedCategory');
      }
      return { ...state, selectedCategory: action.payload };
    
    case ActionTypes.SET_QUESTIONS: {
      const sortedQuestions = [...action.payload].sort((a, b) => a.orderIndex - b.orderIndex);
      return { ...state, questions: sortedQuestions, loading: false };
    }
    
    case ActionTypes.ADD_QUESTION: {
      const newQuestions = [...state.questions, action.payload].sort((a, b) => a.orderIndex - b.orderIndex);
      return { ...state, questions: newQuestions, loading: false };
    }
    
    case ActionTypes.UPDATE_QUESTION:
      return {
        ...state,
        questions: state.questions.map(q => 
          q._id === action.payload._id ? action.payload : q
        ),
        favoriteQuestions: state.favoriteQuestions.map(q => 
          q._id === action.payload._id ? action.payload : q
        ),
        loading: false
      };
    
    case ActionTypes.DELETE_QUESTION:
      return {
        ...state,
        questions: state.questions.filter(q => q._id !== action.payload),
        favoriteQuestions: state.favoriteQuestions.filter(q => q._id !== action.payload),
        loading: false
      };
    
    case ActionTypes.REORDER_QUESTIONS:
      return { ...state, questions: action.payload, loading: false };
    
    case ActionTypes.SET_FAVORITE_QUESTIONS:
      return { ...state, favoriteQuestions: action.payload, loading: false };
    
    case ActionTypes.SET_NOTES:
      // Save to localStorage
      localStorage.setItem('lc_notes', action.payload);
      localStorage.setItem('lc_notes_timestamp', new Date().toISOString());
      return { ...state, notes: action.payload };
    
    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load categories on mount
  useEffect(() => {
    loadCategories();
  }, []);

  // Load selected category from localStorage
  useEffect(() => {
    const savedCategoryId = localStorage.getItem('lc_selectedCategory');
    if (savedCategoryId && state.categories.length > 0) {
      const savedCategory = state.categories.find(cat => cat._id === savedCategoryId);
      if (savedCategory) {
        dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: savedCategory });
      }
    } else if (state.categories.length > 0 && !state.selectedCategory) {
      // Select first category by default
      dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: state.categories[0] });
    }
  }, [state.categories]);

  // Load questions when selected category changes
  useEffect(() => {
    if (state.selectedCategory) {
      loadQuestions(state.selectedCategory._id);
    }
  }, [state.selectedCategory]);

  // API functions
  const loadCategories = async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await categoriesAPI.getAll();
      dispatch({ type: ActionTypes.SET_CATEGORIES, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createCategory = async (name) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await categoriesAPI.create(name);
      dispatch({ type: ActionTypes.ADD_CATEGORY, payload: response.data.data });
      return response.data.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const updateCategory = async (id, name) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await categoriesAPI.update(id, name);
      dispatch({ type: ActionTypes.UPDATE_CATEGORY, payload: response.data.data });
      return response.data.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const deleteCategory = async (id) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await categoriesAPI.delete(id);
      dispatch({ type: ActionTypes.DELETE_CATEGORY, payload: id });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const loadQuestions = async (categoryId) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await questionsAPI.getByCategory(categoryId);
      dispatch({ type: ActionTypes.SET_QUESTIONS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  };

  const createQuestion = async (categoryId, questionText) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await questionsAPI.create(categoryId, questionText);
      dispatch({ type: ActionTypes.ADD_QUESTION, payload: response.data.data });
      return response.data.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const updateQuestion = async (id, data) => {
    try {
      const response = await questionsAPI.update(id, data);
      dispatch({ type: ActionTypes.UPDATE_QUESTION, payload: response.data.data });
      return response.data.data;
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const deleteQuestion = async (id) => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      await questionsAPI.delete(id);
      dispatch({ type: ActionTypes.DELETE_QUESTION, payload: id });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const reorderQuestions = async (questions) => {
    try {
      const reorderData = questions.map((q, index) => ({ id: q._id, orderIndex: index }));
      await questionsAPI.reorder(reorderData);
      dispatch({ type: ActionTypes.REORDER_QUESTIONS, payload: questions });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.response?.data?.message || error.message });
      throw error;
    }
  };

  const loadFavoriteQuestions = useCallback(async () => {
    try {
      dispatch({ type: ActionTypes.SET_LOADING, payload: true });
      const response = await questionsAPI.getFavorites();
      dispatch({ type: ActionTypes.SET_FAVORITE_QUESTIONS, payload: response.data.data });
    } catch (error) {
      dispatch({ type: ActionTypes.SET_ERROR, payload: error.message });
    }
  }, []);

  const setSelectedCategory = (category) => {
    dispatch({ type: ActionTypes.SET_SELECTED_CATEGORY, payload: category });
  };

  const setNotes = (notes) => {
    dispatch({ type: ActionTypes.SET_NOTES, payload: notes });
  };

  const clearError = () => {
    dispatch({ type: ActionTypes.SET_ERROR, payload: null });
  };

  const value = {
    ...state,
    // Actions
    loadCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    loadQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
    reorderQuestions,
    loadFavoriteQuestions,
    setSelectedCategory,
    setNotes,
    clearError,
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
