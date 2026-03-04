import { Spacer, TextViewer } from "@ddanjit/ui";
import type { ComponentProps, InputValue } from "../../types";
import {
  Button,
  Dropdown,
  InfiniteWordInput,
  MultiLineInput,
  MultiSelect,
  Segment,
  SingleLineInput,
  SingleSelect,
  Timer,
  Title,
  WordInput,
} from "../components";
import { Instruction } from "../components/Instruction";

interface Props {
  name: string;
  props: ComponentProps;
  onChangeData: (value: InputValue) => void;
  onAction: (action: string) => void;
}

const ComponentParser = ({ name, props, onChangeData, onAction }: Props) => {
  switch (name) {
    case "instruction":
      return <Instruction instructions={props.instructions as string[]} />;
    case "title":
      return <Title title={props.title as string} />;
    case "timer":
      return (
        <Timer
          onEnd={() => onAction(props.action as string)}
          autoStart={props.autoStart as boolean}
          time={props.time as number}
        />
      );
    case "word_input":
      return (
        <WordInput
          placeholder={props.placeholder as string}
          prefix={props.prefix as string}
          suffix={props.suffix as string}
          onChangeData={onChangeData}
        />
      );
    case "single_line_input":
      return (
        <SingleLineInput
          placeholder={props.placeholder as string}
          prefix={props.prefix as string}
          suffix={props.suffix as string}
          label={props.label as string}
          onChangeData={onChangeData}
        />
      );
    case "multi_line_input":
      return (
        <MultiLineInput
          placeholder={props.placeholder as string}
          label={props.label as string}
          lines={props.lines as number}
          onChangeData={onChangeData}
        />
      );
    case "infinite_word_input":
      return <InfiniteWordInput onChangeData={onChangeData} />;
    case "single_select":
      return (
        <SingleSelect
          options={props.options as string[]}
          onChangeData={onChangeData}
        />
      );
    case "multi_select":
      return (
        <MultiSelect
          options={props.options as string[]}
          onChangeData={onChangeData}
        />
      );
    case "dropdown":
      return (
        <Dropdown
          options={props.options as string[]}
          onChangeData={onChangeData}
        />
      );
    case "segment":
      return (
        <Segment
          options={props.options as string[]}
          onChangeData={onChangeData}
        />
      );
    case "spacer":
      return (
        <Spacer height={props.height as number} width={props.width as number} />
      );
    case "text_viewer":
      return (
        <TextViewer
          title={props.title as string}
          contents={props.contents as string[]}
        />
      );
    case "button":
      return (
        <Button
          text={props.text as string}
          onAction={() => onAction(props.action as string)}
        />
      );
    default:
      return null;
  }
};

export default ComponentParser;
