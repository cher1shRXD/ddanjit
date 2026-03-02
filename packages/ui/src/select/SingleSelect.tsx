import { Option } from "./Option";

interface Props {
  selected: string | null;
  options: string[];
  onChange: (selected: string | null) => void;
  rounded?: number;
}

export const SingleSelect = ({ selected, options, onChange, rounded = 4 }: Props) => {
  const handleSelect = (option: string) => {
    if (selected === option) {
      onChange(null);
    } else {
      onChange(option);
    }
  };

  return (
    <div className="flex flex-col items-center w-full overflow-hidden bg-surface/60" style={{ borderRadius: rounded }}>
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
