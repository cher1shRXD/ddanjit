import { SingleLineInput as Ui } from "@ddanjit/ui";
import type { InputValue } from "../../types";
import { useState } from "react";

interface Props {
  placeholder?: string;
  prefix?: string;
  suffix?: string;
  label?: string;
  onChangeData: (value: InputValue) => void;
}

export const SingleLineInput = ({
  placeholder,
  prefix,
  suffix,
  label,
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
      prefix={prefix}
      suffix={suffix}
      label={label}
    />
  );
};
