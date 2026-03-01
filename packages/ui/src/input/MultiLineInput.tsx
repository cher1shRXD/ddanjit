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
    <div className="flex flex-col gap-0.5 items-start w-full relative">
      <span className="text-sm font-semibold">{label}</span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={max}
        minLength={min}
        rows={lines}
        className="w-full px-4 py-2 text-base rounded-lg outline-none resize-none bg-surface/60"
      />
      <span
        className={`pl-1 text-xs text-static-orange absolute bottom-0 translate-y-full`}>
        {error}
      </span>
    </div>
  );
};
