import { Option } from "./Option";

interface Props {
  selected: string | null;
  options: string[];
  onChange: (selected: string | null) => void;
}

export const SingleSelect = ({ selected, options, onChange }: Props) => {
  const handleSelect = (option: string) => {
    if (selected === option) {
      onChange(null);
    } else {
      onChange(option);
    }
  };

  return (
    <div className="w-full flex flex-col items-center rounded overflow-hidden bg-surface/60">
      {options.map((option) => (
        <Option
          key={option}
          label={option}
          selected={selected === option}
          onSelect={handleSelect}
        />
      ))}
    </div>
  );
};
