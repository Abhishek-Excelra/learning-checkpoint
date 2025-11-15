// LocalStorage utility functions for Learning Checkpoint
// Keys: lc_selectedLanguage, lc_checklist_progress, lc_notes

const STORAGE_KEYS = {
  SELECTED_LANGUAGE: 'lc_selectedLanguage',
  CHECKLIST_PROGRESS: 'lc_checklist_progress',
  NOTES: 'lc_notes'
};

export const getSelectedLanguage = () => {
  return localStorage.getItem(STORAGE_KEYS.SELECTED_LANGUAGE) || 'javascript';
};

export const setSelectedLanguage = (language) => {
  localStorage.setItem(STORAGE_KEYS.SELECTED_LANGUAGE, language);
};

// Checklist Progress Functions
export const getChecklistProgress = () => {
  try {
    const progress = localStorage.getItem(STORAGE_KEYS.CHECKLIST_PROGRESS);
    return progress ? JSON.parse(progress) : {};
  } catch (error) {
    console.error('Error parsing checklist progress from localStorage:', error);
    return {};
  }
};

export const setChecklistProgress = (progress) => {
  localStorage.setItem(STORAGE_KEYS.CHECKLIST_PROGRESS, JSON.stringify(progress));
};

export const toggleTopicCompletion = (topicId) => {
  const progress = getChecklistProgress();
  progress[topicId] = !progress[topicId];
  setChecklistProgress(progress);
  return progress;
};

export const resetAllProgress = () => {
  localStorage.removeItem(STORAGE_KEYS.CHECKLIST_PROGRESS);
  return {};
};

// Notes Functions
export const getNotes = () => {
  return localStorage.getItem(STORAGE_KEYS.NOTES) || '';
};

export const setNotes = (notes) => {
  localStorage.setItem(STORAGE_KEYS.NOTES, notes);
};

export const getLastSavedTimestamp = () => {
  const timestamp = localStorage.getItem('lc_notes_timestamp');
  return timestamp ? new Date(timestamp) : null;
};

export const setLastSavedTimestamp = () => {
  localStorage.setItem('lc_notes_timestamp', new Date().toISOString());
};
