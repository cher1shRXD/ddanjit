import type { Activity } from "@ddanjit/domain";
import { icons } from "../../../shared/constants/icons";
import { Spacer } from "@ddanjit/ui";
import { Icon } from "@iconify/react";

interface Props {
  data: Activity;
}

const ActivityItem = ({ data }: Props) => {
  return (
    <div className="flex items-center w-full gap-1 p-2">
      <img src={icons[data.icon]} alt="" className="w-6 h-6" />
      <span className="text-lg font-semibold">{data.title}</span>
      <Spacer />
      <Icon icon="mynaui:chevron-right" className="text-xl" />
    </div>
  );
};

export default ActivityItem;
