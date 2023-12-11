export const setItem = (key: string, value: string) => {
  window.localStorage.setItem(key, value);
  window.dispatchEvent(new StorageEvent('storage', { key, newValue: value }));
};

export const getItem = (key: string) => {
  return window.localStorage.getItem(key);
};
