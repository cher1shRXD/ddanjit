import { useActivityStore } from "../../features/find-activity/stores/activity";
import { useTimeStore } from "../../features/find-activity/stores/time";
import { useResultStore } from "../../features/play/stores/result";
import { timeOptions } from "../../features/find-activity/constants/options";
import type { Duration } from "@ddanjit/domain";

export const clearLocalStorage = (keepStores?: ("activity" | "time" | "result")[]) => {
  const keysToKeep = ["ACCESS_TOKEN", "REFRESH_TOKEN"];
  const saved = keysToKeep.reduce<Record<string, string>>((acc, key) => {
    const value = localStorage.getItem(key);
    if (value !== null) acc[key] = value;
    return acc;
  }, {});

  localStorage.clear();

  if (!keepStores?.includes("activity")) {
    useActivityStore.persist.clearStorage();
    useActivityStore.setState({ activity: null });
  } else {
    useActivityStore.persist.rehydrate();
  }

  if (!keepStores?.includes("time")) {
    useTimeStore.persist.clearStorage();
    useTimeStore.setState({ time: timeOptions[0] as Duration });
  } else {
    useTimeStore.persist.rehydrate();
  }

  if (!keepStores?.includes("result")) {
    useResultStore.persist.clearStorage();
    useResultStore.setState({ activity: null, inputs: null });
  } else {
    useResultStore.persist.rehydrate();
  }

  Object.entries(saved).forEach(([key, value]) => {
    localStorage.setItem(key, value);
  });
};
