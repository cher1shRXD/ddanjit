import {
  Button,
  MultiLineInput,
  MultiSelect,
  SingleSelect,
  Segment,
  Dropdown,
  SingleLineInput,
  TextViewer,
  Timer,
  WordInput,
} from ".";
import { useState } from "react";

export const Test = () => {
  const [text, setText] = useState("");
  const [multiSelectValue, setMultiSelectValue] = useState<string[]>([]);
  const [singleSelectValue, setSingleSelectValue] = useState<string | null>(
    null,
  );
  const segementOptions = ["Option 1", "Option 2"];
  const [segmentValue, setSegmentValue] = useState(segementOptions[0]!);
  const dropdownOptions = [
    "Option 12fdafdsafsa",
    "취준생",
    "내가 웃는게 웃는게 아니야",
  ];
  const [dropdownValue, setDropdownValue] = useState(dropdownOptions[0]!);

  return (
    <div className="w-full h-screen overflow-y-scroll">
      <h1 className="text-3xl font-bold mb-8">UI Component Testing</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Button background="primary" className="text-white">
          Primary Button
        </Button>
        <Button background="transparent" className="text-text/40">
          Text Button
        </Button>

        <MultiLineInput
          value={text}
          onChange={setText}
          placeholder="example"
          label="Label"
          error="error message"
          lines={5}
        />

        <MultiSelect
          options={[
            "iconname1::Option 1",
            "iconname2::Option 2",
            "iconname3::Option 3",
          ]}
          selected={multiSelectValue}
          onChange={setMultiSelectValue}
        />

        <SingleSelect
          selected={singleSelectValue}
          options={[
            "iconname1::Option 1",
            "iconname2::Option 2",
            "iconname3::Option 3",
          ]}
          onChange={setSingleSelectValue}
        />

        <Segment
          options={segementOptions}
          selected={segmentValue}
          onChange={setSegmentValue}
        />

        <Dropdown
          options={dropdownOptions}
          selected={dropdownValue}
          onChange={setDropdownValue}
        />

        <SingleLineInput
          value={text}
          onChange={setText}
          placeholder="example"
          label="Label"
          error="error message"
          prefix="Prefix"
        />

        <TextViewer
          title="Example Title"
          contents={[
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor. 2",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor. 3",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.\n\nLorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.",
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum doloremque accusamus quia architecto velit quisquam. Modi voluptate natus tenetur vel minus sequi omnis in temporibus repellat. Corporis debitis dolorum dolor.",
          ]}
        />

        <Timer totalSeconds={2} onEnd={() => alert("Timer ended!")} />

        <WordInput
          value={text}
          onChange={setText}
          placeholder="example"
          label="Label"
          error="error message"
          prefix="Prefix"
          suffix="Suffix"
          max={10}
        />
      </div>
    </div>
  );
};
