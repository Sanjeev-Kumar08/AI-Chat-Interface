const STORAGE_KEY = 'ai_chat_history';

export const saveToStorage = (messages) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error('Failed to save to localStorage:', error);
  }
};

export const loadFromStorage = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Failed to load from localStorage:', error);
    return [];
  }
};