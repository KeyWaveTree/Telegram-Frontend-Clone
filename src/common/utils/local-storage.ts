export const localStorageUtil = {
  setItem: <T>(key: string, value: T): void => {
    try {
      const json = JSON.stringify(value);
      localStorage.setItem(key, json);
    } catch (err) {
      console.error(`Error saving "${key}" to localStorage`, err);
    }
  },

  getItem: <T>(key: string): T | null => {
    try {
      const json = localStorage.getItem(key);
      if (!json) return null;
      return JSON.parse(json) as T;
    } catch (err) {
      console.error(`Error parsing "${key}" from localStorage`, err);
      return null;
    }
  },

  removeItem: (key: string): void => {
    localStorage.removeItem(key);
  },

  clear: (): void => {
    localStorage.clear();
  },
};
