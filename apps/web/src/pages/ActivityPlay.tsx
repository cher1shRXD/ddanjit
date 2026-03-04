import { useState } from "react";
import type { ComponentProps, InputValue } from "../features/play/types";
import ComponentParser from "../features/play/ui/engine/CompoentParser";
import { data } from "../features/play/constants/data";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Header from "../features/play/ui/Header";

const ActivityPlay = () => {
  const [inputs, setInputs] = useState<Record<string, InputValue>>({});
  const [stepIndex, setStepIndex] = useState(0);

  const content = data.content;
  const totalSteps = content.data.length;
  const currentStep = content.data[stepIndex];

  const handleInputs = (key: string, value: InputValue) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const handleAction = (action: string) => {
    switch (action) {
      case "next":
        if (stepIndex < totalSteps - 1) setStepIndex((prev) => prev + 1);
        break;
      case "prev":
        if (stepIndex > 0) setStepIndex((prev) => prev - 1);
        break;
      case "done":
        alert("done: "+JSON.stringify(inputs));
        break;
    }
  };

  return (
    <Screen className="flex flex-col w-full gap-4 px-4 py-6 overflow-y-scroll">
      <Header data={`${data.icon}::${data.title}`} />
      {currentStep?.map(({ name, props }, compIndex) => (
        <ComponentParser
          key={`${stepIndex}-${compIndex}`}
          name={name}
          props={props as ComponentProps}
          onChangeData={(value) =>
            handleInputs((props.key as string) ?? name, value)
          }
          onAction={handleAction}
        />
      ))}
    </Screen>
  );
};

export default ActivityPlay;
