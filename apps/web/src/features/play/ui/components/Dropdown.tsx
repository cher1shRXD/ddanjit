import { Dropdown as Ui } from "@ddanjit/ui";
import type { InputValue } from "../../types";
import { useState } from "react";

interface Props {
  options: string[];
  onChangeData: (value: InputValue) => void;
}

export const Dropdown = ({ options, onChangeData }: Props) => {
  const [selected, setSelected] = useState(options[0] ?? "");
  
  return (
    <Ui
      options={options}
      selected={selected}
      onChange={(v) => {
        setSelected(v);
        onChangeData(v);
      }}
    />
  );
};
