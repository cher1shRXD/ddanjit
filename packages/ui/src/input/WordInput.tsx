import { useEffect, useRef, useState } from "react";

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

export const WordInput = ({
  value,
  onChange,
  label,
  prefix,
  suffix,
  error,
  placeholder,
  max,
  min
}: Props) => {
  const spanRef = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [inputWidth, setInputWidth] = useState<number | "auto">("auto");

  useEffect(() => {
    if (!spanRef.current || !wrapperRef.current) return;
    const spanWidth = spanRef.current.getBoundingClientRect().width;
    const maxWidth = wrapperRef.current.getBoundingClientRect().width;
    setInputWidth(Math.min(spanWidth, maxWidth));
  }, [value, placeholder]);

  return (
    <div className="flex flex-col gap-0.5 items-start w-full">
      {label && <span className="text-sm font-semibold">{label}</span>}
      <div ref={wrapperRef} className="flex items-center w-full">
        {prefix && <span className="whitespace-nowrap mr-2">{prefix}</span>}
        <div className="flex items-center min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={max}
            minLength={min}
            style={{ width: inputWidth }}
            className="bg-surface/60 px-4 py-2 rounded-lg outline-none text-base max-w-full"
          />
          {suffix && (
            <span className="whitespace-nowrap ml-2 text-base">{suffix}</span>
          )}
        </div>
        <span
          ref={spanRef}
          className="opacity-0 pointer-events-none fixed whitespace-pre px-4 py-2 text-base">
          {value || placeholder || ""}
        </span>
      </div>
      {error && <span className="text-static-orange text-xs">{error}</span>}
    </div>
  );
};
