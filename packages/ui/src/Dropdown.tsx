import { useEffect, useMemo, useRef } from "react";

interface Props {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
  fontSize?: number;
}

export const Dropdown = ({ options, selected, onChange, fontSize = 16 }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  // Calculate dimensions based on fontSize
  const itemHeight = useMemo(() => Math.round(fontSize * 2.125), [fontSize]);
  const containerHeight = useMemo(() => Math.round(itemHeight * 1.88), [itemHeight]);
  const padding = useMemo(() => (containerHeight - itemHeight) / 2, [containerHeight, itemHeight]);

  useEffect(() => {
    const index = options.indexOf(selected);
    if (scrollRef.current && index !== -1) {
      scrollRef.current.scrollTop = index * itemHeight;
    }
  }, [options, selected, itemHeight]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    isScrollingRef.current = true;
    timerRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const index = Math.round(scrollRef.current.scrollTop / itemHeight);
      const clamped = Math.max(0, Math.min(index, options.length - 1));

      scrollRef.current.scrollTo({
        top: clamped * itemHeight,
        behavior: "smooth",
      });

      if (options[clamped] !== selected) {
        onChange(options[clamped] || selected);
      }
    }, 100);
  };

  const handleClick = (index: number) => {
    if (!scrollRef.current || index < 0 || index >= options.length) return;
    
    scrollRef.current.scrollTo({
      top: index * itemHeight,
      behavior: "smooth",
    });

    onChange(options[index] || options[0]!);
  };

  return (
    <div 
      style={{ height: containerHeight }}
      className="bg-surface/60 w-min px-1 rounded-2xl relative flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 flex items-center px-1 py-2.5">
        <div 
          style={{ height: itemHeight }}
          className="flex-1 rounded-lg bg-surface/80" 
        />
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll no-scrollbar">
        <div
          style={{ paddingTop: padding, paddingBottom: padding }}
          className="px-4">
          {options.map((option, index) => (
            <div
              key={option}
              style={{ height: itemHeight, scrollSnapAlign: "center" }}
              className={`flex items-center justify-center transition-transform cursor-pointer ${
                selected === option ? "opacity-100 text-primary scale-100 font-bold" : "opacity-40 scale-90"
              }`}
              onClick={() => handleClick(index)}>
              <p 
                style={{ fontSize }}
                className="truncate">
                {option}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
