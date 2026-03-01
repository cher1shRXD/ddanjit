interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  max?: number;
  min?: number;
  lines?: number;
}

export const MultiLineInput = ({
  value,
  onChange,
  label,
  error,
  placeholder,
  max,
  min,
  lines,
}: Props) => {
  return (
    <div className="flex flex-col gap-0.5 items-start w-full">
      {label && <span className="text-sm font-semibold">{label}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={max}
        minLength={min}
        rows={lines}
        className="bg-surface/60 px-4 py-2 rounded-lg outline-none text-base w-full resize-none"
      />
      {error && <span className="text-static-orange text-xs">{error}</span>}
    </div>
  );
};
