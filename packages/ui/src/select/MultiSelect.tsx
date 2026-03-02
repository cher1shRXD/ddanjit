import { Option } from "./Option";

interface Props {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  rounded?: number;
}

export const MultiSelect = ({ options, selected, onChange, rounded = 4 }: Props) => {
  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-surface/60" style={{ borderRadius: rounded }}>
      {options.map((option) => (
        <Option
          key={option}
          label={option}
          selected={selected.includes(option)}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
