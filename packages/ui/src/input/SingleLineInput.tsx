interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  prefix?: string;
  error?: string;
  placeholder?: string;
  max?: number;
  min?: number;
}

export const SingleLineInput = ({
  value,
  onChange,
  label,
  prefix,
  error,
  placeholder,
  max,
  min
}: Props) => {
  return (
    <div className="flex flex-col gap-0.5 items-start w-full">
      {label && <span className="text-sm font-semibold">{label}</span>}
      <div className="flex items-center w-full gap-2">
        {prefix && <span>{prefix}</span>}
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={max}
            minLength={min}
            className="bg-surface/60 px-4 py-2 rounded-lg outline-none text-base flex-1"
          />
      </div>
      {error && <span className="text-static-orange text-xs">{error}</span>}
    </div>
  );
};
