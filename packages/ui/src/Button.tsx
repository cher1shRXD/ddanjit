import { ComponentProps } from "react";
import { color } from "./color";

interface Props extends ComponentProps<"button"> {
  background?: keyof typeof color;
  size?: "full" | "fit";
  rounded?: number;
}

export const Button = ({ background, children, className, size = "full", rounded = 4, ...props }: Props) => {
  const backgroundColor = background ? color[background] : color.transparent;
  return (
    <button
      style={{
        backgroundColor,
        borderRadius: rounded,
      }}
      className={`${size === "full" ? "w-full" : "w-fit px-6"} ${background === "transparent" ? "py-0" : "py-3"} active:scale-98 transition-all ${className}`}
      {...props}>
      {children}
    </button>
  );
};
