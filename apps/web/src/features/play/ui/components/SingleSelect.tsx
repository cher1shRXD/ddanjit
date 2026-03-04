import { SingleSelect as Ui } from "@ddanjit/ui";
import { useState } from "react";
import type { InputValue } from "../../types";

interface Props {
  options: string[];
  onChangeData: (value: InputValue) => void;
}

export const SingleSelect = ({ options, onChangeData }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Ui
      options={options}
      selected={selected}
      onChange={(v) => {
        setSelected(v);
        onChangeData(v ?? undefined);
      }}
    />
  );
};
