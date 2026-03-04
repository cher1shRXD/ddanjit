import { useState } from "react";
import type {
  ComponentProps,
  ContentData,
  InputValue,
} from "../features/play/types";
import ComponentParser from "../features/play/ui/engine/CompoentParser";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Header from "../features/play/ui/Header";
import Sliding from "../shared/ui/Sliding";
import { useActivityStore } from "../features/find-activity/stores/activity";
import { useResultStore } from "../features/play/stores/result";

const ActivityPlay = () => {
  const { activity } = useActivityStore();
  const { setResult } = useResultStore();
  const [inputs, setInputs] = useState<Record<string, InputValue>>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [closeRequest, setCloseRequest] = useState(false);
  const [requestedAction, setRequestedAction] = useState("done");

  const content = activity?.content as ContentData | undefined;
  const totalSteps = content?.data.length;
  const currentStep = content?.data[stepIndex];

  const handleInputs = (key: string, value: InputValue) => {
    setInputs((prev) => {
      const next = { ...prev };
      const isEmpty =
        value === "" ||
        value === null ||
        value === undefined ||
        (Array.isArray(value) && value.length === 0) ||
        (Array.isArray(value) && value.every((v) => v === ""));
      if (isEmpty) {
        delete next[key];
      } else {
        next[key] = value;
      }
      return next;
    });
  };

  const handleActionRequest = (action: string) => {
    if (!totalSteps) return;
    switch (action) {
      case "next":
        if (stepIndex < totalSteps - 1) {
          setCloseRequest(true);
          setRequestedAction("next");
        }
        break;
      case "prev":
        if (stepIndex > 0) {
          setCloseRequest(true);
          setRequestedAction("false");
        }
        break;
      case "done":
        setCloseRequest(true);
        setRequestedAction("done");
        break;
    }
  };

  const handleAction = () => {
    switch (requestedAction) {
      case "next":
        setCloseRequest(false);
        setStepIndex((prev) => prev + 1);
        break;
      case "prev":
        setCloseRequest(false);
        setStepIndex((prev) => prev - 1);
        break;
      case "done":
        setResult(activity, inputs);
        setIsDone(true);
        break;
    }
  };

  return (
    <Screen className="flex flex-col w-full gap-4 px-4 py-6 overflow-y-scroll">
      <Header
        data={`${activity?.icon}::${activity?.title}`}
        closeRequest={closeRequest && isDone}
      />
      {currentStep?.map(({ name, props }, compIndex) => (
        <Sliding
          direction="left-right"
          startPosition="400%"
          delay={compIndex * 0.1}
          duration={1}
          closeDelay={compIndex * 0.1}
          closeRequest={closeRequest}
          animationStyle="bouncy"
          key={`${stepIndex}-${compIndex}`}>
          <ComponentParser
            name={name}
            props={props as ComponentProps}
            inputs={inputs}
            onChangeData={(value) =>
              handleInputs((props.key as string) ?? name, value)
            }
            onAction={handleActionRequest}
          />
        </Sliding>
      ))}
      <Sliding
        direction="left-right"
        startPosition="400%"
        delay={0}
        duration={0.5}
        closeRequest={closeRequest}
        closeDelay={(currentStep?.length || 0) * 0.1}
        onAnimationComplete={handleAction}>
        <span />
      </Sliding>
    </Screen>
  );
};

export default ActivityPlay;
