interface Props {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

export const Segment = ({ options, selected, onChange }: Props) => {
  return (
    <div className="w-full bg-surface/60 rounded-2xl p-2 flex items-center justify-center">
      {options.map((option) => (
        <div
          key={option}
          className={`flex-1 flex items-center justify-center rounded-lg ${selected === option ? "bg-primary text-white" : "bg-transparent text-text"} active:scale-98 transition-all py-2 text-sm font-semibold`}
          onClick={() => onChange(option)}>
          {option}
        </div>
      ))}
    </div>
  );
};
