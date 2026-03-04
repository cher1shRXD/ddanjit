import { Button as Ui } from "@ddanjit/ui";

export const Button = ({
  text,
  onAction,
}: {
  text: string;
  onAction: () => void;
}) => (
  <Ui background="primary" onClick={onAction} rounded={16} className="text-white">
    {text}
  </Ui>
);
