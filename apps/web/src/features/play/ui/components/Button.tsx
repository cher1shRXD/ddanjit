import { Button as Ui } from "@ddanjit/ui";
import type { InputValue } from "../../types";

export const Button = ({
  text,
  requires,
  inputs,
  onAction,
}: {
  text: string;
  requires?: string[];
  inputs?: Record<string, InputValue>;
  onAction: () => void;
}) => {
  const disabled = requires?.some((key) => inputs?.[key] === undefined) ?? false;
  return (
    <Ui
      background="primary"
      onClick={onAction}
      rounded={16}
      className="text-white disabled:opacity-40 transition-opacity"
      disabled={disabled}>
      {text}
    </Ui>
  );
};
