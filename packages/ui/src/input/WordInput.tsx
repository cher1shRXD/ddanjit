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
  min,
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
    <div className="flex flex-col gap-0.5 items-start w-full relative">
      <span className="text-sm font-semibold">{label}</span>
      <div ref={wrapperRef} className="flex items-center w-full">
        {prefix && <span className="mr-2 whitespace-nowrap">{prefix}</span>}
        <div className="flex items-center min-w-0">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            maxLength={max}
            minLength={min}
            style={{ width: inputWidth }}
            className="max-w-full px-4 py-2 text-base rounded-lg outline-none bg-surface/60"
          />
          {suffix && (
            <span className="ml-2 text-base whitespace-nowrap">{suffix}</span>
          )}
        </div>
        <span
          ref={spanRef}
          className="fixed px-4 py-2 text-base whitespace-pre opacity-0 pointer-events-none">
          {value || placeholder || ""}
        </span>
      </div>
      <span
        className={`pl-1 text-xs text-static-orange absolute bottom-0 translate-y-full`}>
        {error}
      </span>
    </div>
  );
};
