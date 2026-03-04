import { MultiLineInput as Ui } from "@ddanjit/ui";
import type { InputValue } from "../../types";
import { useState } from "react";

interface Props {
  placeholder?: string;
  label?: string;
  lines?: number;
  onChangeData: (value: InputValue) => void;
}

export const MultiLineInput = ({
  placeholder,
  label,
  lines,
  onChangeData,
}: Props) => {
  const [value, setValue] = useState("");
  return (
    <Ui
      value={value}
      onChange={(v) => {
        setValue(v);
        onChangeData(v);
      }}
      placeholder={placeholder}
      label={label}
      lines={lines}
    />
  );
};
