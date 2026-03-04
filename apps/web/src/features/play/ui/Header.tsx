import type { Activity } from "@ddanjit/domain";
import { icons } from "../../../shared/constants/icons";
import { Spacer } from "@ddanjit/ui";
import { Icon } from "@iconify/react";
import Fading from "../../../shared/ui/Fading";

interface Props {
  data: string;
  closeRequest: boolean;
}

const Header = ({ data, closeRequest }: Props) => {
  const [iconName, title] = data.split("::") as [string, string];

  return (
    <Fading
      closeRequest={closeRequest}
      className="flex items-center w-full mt-4">
      <img
        src={icons[(iconName as Activity["icon"]) || "lightbulb"]}
        alt=""
        className="w-6 h-6"
      />
      <h1 className="text-xl font-bold">{title}</h1>
      <Spacer />
      <Icon icon="material-symbols:close" className="w-6 h-6" />
    </Fading>
  );
};

export default Header;
