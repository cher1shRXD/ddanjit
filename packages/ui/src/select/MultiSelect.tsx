import { Option } from "./Option";

interface Props {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

export const MultiSelect = ({ options, selected, onChange }: Props) => {
  const handleSelect = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((o) => o !== option));
    } else {
      onChange([...selected, option]);
    }
  }

  return (
    <div className="w-full flex flex-col items-center rounded overflow-hidden bg-surface/60">
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
