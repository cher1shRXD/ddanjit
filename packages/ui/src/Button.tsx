import { ComponentProps } from "react";
import { color } from "./color";

interface Props extends ComponentProps<"button"> {
  background?: keyof typeof color;
}

export const Button = ({ background, children, className, ...props }: Props) => {
  const backgroundColor = background ? color[background] : color.transparent;
  return (
    <button
      style={{
        backgroundColor,
      }}
      className={`w-full ${background === "transparent" ? "py-0" : "py-3"} rounded active:scale-98 transition-all ${className}`}
      {...props}>
      {children}
    </button>
  );
};
