import { WordInput as Ui } from "@ddanjit/ui";
import type { InputValue } from "../../types";
import { useState } from "react";

interface Props {
  onChangeData: (value: InputValue) => void;
}

export const InfiniteWordInput = ({ onChangeData }: Props) => {
  const [fields, setFields] = useState<string[]>([""]);

  const handleChange = (index: number, value: string) => {
    const next = fields.map((f, i) => (i === index ? value : f));

    if (next[next.length - 1] !== "") next.push("");

    while (
      next.length > 1 &&
      next[next.length - 1] === "" &&
      next[next.length - 2] === ""
    ) {
      next.pop();
    }

    setFields(next);
    onChangeData(next.filter((f) => f.length > 0));
  };

  return (
    <div className="flex flex-col w-full gap-2">
      {fields.map((field, index) => (
        <Ui
          key={index}
          value={field}
          onChange={(v) => handleChange(index, v)}
          placeholder="여기에 입력하기          "
        />
      ))}
    </div>
  );
};
