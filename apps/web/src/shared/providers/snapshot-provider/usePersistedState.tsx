import { useState } from "react";
import { useTab } from "../tab-provider/useTab";
import { registry } from "./registry";
import { useLocalStorage } from "../../libs/storage/storage";
import type { StateValue } from "./types";

type Widen<T> = T extends boolean
  ? boolean
  : T extends number
    ? number
    : T extends string
      ? string
      : T;

export const usePersistedState = <T extends StateValue>(
  defaultValue: Widen<T>,
  key: string,
) => {
  const { current } = useTab();
  const storageKey = `snapshot:${current}:${key}`;
  const { value: localStorageValue } = useLocalStorage(storageKey);

  const [value, setValue] = useState<Widen<T>>(
    () =>
      (localStorageValue
        ? JSON.parse(localStorageValue)
        : defaultValue) as Widen<T>,
  );

  registry.set(storageKey, () => JSON.stringify(value));

  return [value, setValue] as const;
};
