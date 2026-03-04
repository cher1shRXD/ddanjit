import { useState } from "react";
import type { InputValue } from "../../types";
import { WordInput as Ui } from "@ddanjit/ui";

interface Props {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  onChangeData: (value: InputValue) => void;
}

export const WordInput = ({ placeholder, prefix, suffix, onChangeData }: Props) => {
  const [value, setValue] = useState("");
  return (
    <Ui
      value={value}
      onChange={(v) => {
        setValue(v);
        onChangeData(v);
      }}
      placeholder={placeholder}
      prefix={prefix}
      suffix={suffix}
    />
  );
};
