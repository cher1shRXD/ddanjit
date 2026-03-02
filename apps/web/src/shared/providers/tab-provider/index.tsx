import { Activity, useState } from "react";
import type { TabItem } from "./types";
import { TabContext } from "./tab-context";
import { registry } from "../snapshot-provider/registry";
import SnapshotProvider from "../snapshot-provider/SnapshotProvider";
import { storage } from "../../libs/storage/storage";

interface Props {
  activities: TabItem[];
  initialKey: string;
}

export const TabProvider = ({ activities, initialKey }: Props) => {
  const [current, setCurrent] = useState(initialKey);

  const move = (key: string) => {
    registry.forEach((_, storageKey) => {
      if (storageKey.startsWith(`snapshot:${current}:`)) {
        registry.delete(storageKey);
      }
    });
    setCurrent(key);
    storage.setItem("current-tab", key);
  };

  return (
    <TabContext.Provider value={{ current, move }}>
      <SnapshotProvider>
        {activities.map(({ key, component }) => (
          <Activity key={key} mode={key === current ? "visible" : "hidden"}>
            {component}
          </Activity>
        ))}
      </SnapshotProvider>
    </TabContext.Provider>
  );
};
