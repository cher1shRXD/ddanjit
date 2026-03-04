export const clearLocalStorage = (keysToKeep: string[]) => {
  const saved = keysToKeep.reduce<Record<string, string>>((acc, key) => {
    const value = localStorage.getItem(key);
    if (value !== null) acc[key] = value;
    return acc;
  }, {});

  localStorage.clear();

  Object.entries(saved).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};
