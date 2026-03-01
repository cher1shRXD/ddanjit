interface Props {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  prefix?: string;
  suffix?: string;
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
  suffix,
  error,
  placeholder,
  max,
  min,
}: Props) => {
  return (
    <div className="flex flex-col gap-0.5 items-start w-full relative">
      <span className="text-sm font-semibold">{label}</span>
      <div className="flex items-center w-full gap-2">
        {prefix && <span className="whitespace-nowrap">{prefix}</span>}
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={max}
          minLength={min}
          className="flex-1 w-full min-w-0 px-4 py-2 text-base rounded-lg outline-none bg-surface/60"
        />
        {suffix && <span className="whitespace-nowrap">{suffix}</span>}
      </div>
      <span
        className={`pl-1 text-xs text-static-orange absolute bottom-0 translate-y-full`}>
        {error}
      </span>
    </div>
  );
};
