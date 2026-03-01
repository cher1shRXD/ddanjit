import { Activity, useState } from "react";
import type { TabItem } from "./types";
import { TabContext } from "./tab-context";

interface Props {
  activities: TabItem[];
  initialKey: string;
}

export const TabProvider = ({ activities, initialKey }: Props) => {
  const [current, setCurrent] = useState(initialKey);

  return (
    <TabContext.Provider value={{ current, move: setCurrent }}>
      {activities.map(({ key, component }) => (
        <Activity key={key} mode={key === current ? "visible" : "hidden"}>
          {component}
        </Activity>
      ))}
    </TabContext.Provider>
  );
};
