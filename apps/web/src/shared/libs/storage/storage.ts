import { useSyncExternalStore } from "react";

const subscribers = new Set<() => void>();

const notifySubscribers = () => subscribers.forEach((fn) => fn());

export const storage = {
  getItem: (key: string) => localStorage.getItem(key),
  setItem: (key: string, value: string) => {
    localStorage.setItem(key, value);
    notifySubscribers();
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    notifySubscribers();
  },
};

export const useLocalStorage = (key: string) => {
  const value = useSyncExternalStore(
    (callback) => {
      subscribers.add(callback);
      return () => subscribers.delete(callback);
    },
    () => localStorage.getItem(key),
    () => null,
  );

  return {
    value,
    set: (value: string) => storage.setItem(key, value),
    remove: () => storage.removeItem(key),
  };
};
