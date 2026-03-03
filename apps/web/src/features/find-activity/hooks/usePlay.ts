import type { Activity } from "@ddanjit/domain";
import { useTab } from "../../../shared/providers/tab-provider/useTab";
import { useActivityStore } from "../stores/activity";

export const usePlay = () => {
  const tab = useTab();
  const { setActivity } = useActivityStore();

  const play = (activity: Activity) => {
    setActivity(activity);
    tab.move("activity");
  };

  return { play };
}