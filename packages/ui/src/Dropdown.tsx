import { useEffect, useRef } from "react";

interface Props {
  options: string[];
  selected: string;
  onChange: (selected: string) => void;
}

const ITEM_HEIGHT = 34;
const CONTAINER_HEIGHT = 64;
const PADDING = (CONTAINER_HEIGHT - ITEM_HEIGHT) / 2;

export const Dropdown = ({ options, selected, onChange }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  useEffect(() => {
    const index = options.indexOf(selected);
    if (scrollRef.current && index !== -1) {
      scrollRef.current.scrollTop = index * ITEM_HEIGHT;
    }
  }, [options, selected]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    isScrollingRef.current = true;
    timerRef.current = setTimeout(() => {
      if (!scrollRef.current) return;
      const index = Math.round(scrollRef.current.scrollTop / ITEM_HEIGHT);
      const clamped = Math.max(0, Math.min(index, options.length - 1));

      scrollRef.current.scrollTo({
        top: clamped * ITEM_HEIGHT,
        behavior: "smooth",
      });

      if (options[clamped] !== selected) {
        onChange(options[clamped] || selected);
      }
    }, 100);
  };

  const handleClick = (index: number) => {
    if (!scrollRef.current || index < 0 || index >= options.length) return;
    if (index === options.length - 1) {
      scrollRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      scrollRef.current.scrollTo({
        top: (index + 1) * ITEM_HEIGHT,
        behavior: "smooth",
      });
    }

    onChange(options[index] || options[0]!);
  };

  return (
    <div className="bg-surface/60 w-min h-16 px-1 rounded-2xl relative flex items-center">
      <div className="absolute top-0 left-0 w-full h-full -z-10 flex items-center px-1 py-2.5">
        <div className="flex-1 h-full rounded-lg bg-surface/80" />
      </div>
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-scroll">
        <div
          style={{ paddingTop: PADDING, paddingBottom: PADDING }}
          className="px-4">
          {options.map((option, index) => (
            <div
              key={option}
              style={{ height: ITEM_HEIGHT, scrollSnapAlign: "center" }}
              className={`flex items-center justify-center transition-transform ${
                selected === option ? "opacity-100 text-primary scale-100" : "opacity-40 scale-90"
              }`}
              onClick={() => handleClick(index)}>
              <p className="truncate">{option}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
