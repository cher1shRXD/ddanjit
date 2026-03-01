import { Icon } from "@iconify/react";

interface Props {
  label: string;
  selected: boolean;
  onSelect: (option: string) => void;
}

export const Option = ({ label, selected, onSelect }: Props) => {
  const hasIcon =
    label.includes("::") && !!label.split("::")[0] && !!label.split("::")[1];

  const icon = hasIcon ? label.split("::")[0] : null;
  const text = hasIcon ? label.split("::")[1] : label;

  return (
    <div
      className={`w-full py-2 pr-4 transition-colors ${selected ? "bg-secondary text-text/60" : ""} ${hasIcon ? "pl-2" : "px-4"}`}
      onClick={() => onSelect(label)}>
      <div className="active:scale-98 transition-all flex items-center">
        {icon && <span className="mr-1">{icon}</span>}
        <span className="truncate font-semibold text-sm">{text}</span>
        {selected && (
          <Icon icon="ic:round-check" className="ml-auto text-white" />
        )}
      </div>
    </div>
  );
};
