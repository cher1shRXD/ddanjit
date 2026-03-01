import {
  Button,
  Segment,
  SingleLineInput,
  SingleSelect,
  Spacer,
} from "@ddanjit/ui";
import Sliding from "../../../shared/ui/Sliding";
import { useRegisterInfo } from "../hooks/useRegisterInfo";
import { useTab } from "../../../shared/providers/tab-provider/useTab";

interface Props {
  closeRequest: boolean;
  requestClose: (state: boolean) => void;
}

const Form = ({ closeRequest, requestClose }: Props) => {
  const tab = useTab();
  const {
    name,
    setName,
    birthYear,
    setBirthYear,
    hasJobOptions,
    hasJob,
    setHasJob,
    job,
    setJob,
    genderOptions,
    gender,
    setGender,
    error,
    submit,
  } = useRegisterInfo(requestClose);

  return (
    <Sliding
      direction="left-right"
      startPosition="200%"
      delay={0.4}
      closeRequest={closeRequest}
      closeDelay={0.5}
      animationStyle="bouncy"
      className="flex flex-col flex-1 w-full gap-5">
      <div className="flex items-center w-full gap-4">
        <div className="flex-1">
          <SingleLineInput
            value={name}
            onChange={setName}
            placeholder="홍길동"
            max={10}
            error={error.name}
          />
        </div>
        <div className="flex-1">
          <SingleLineInput
            value={birthYear}
            onChange={setBirthYear}
            placeholder="2008"
            max={4}
            suffix="년생"
            error={error.birthYear}
          />
        </div>
      </div>
      <SingleSelect
        options={genderOptions}
        selected={gender}
        onChange={setGender}
      />
      <div className="flex flex-col items-center w-full gap-3">
        <Segment
          options={hasJobOptions}
          selected={hasJob}
          onChange={setHasJob}
        />
        {hasJob === "직업 있음" && (
          <SingleLineInput
            value={job}
            onChange={setJob}
            placeholder="프론트엔드 개발자"
            max={50}
            label="어떤 일을 하고 계신가요?"
          />
        )}
      </div>
      <Spacer />
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.8}
        animationStyle="bouncy"
        onAnimationComplete={() => tab.move("analyze-acquisition")}>
        <Button background="primary" size="full" className="text-white" onClick={submit}>
          다음
        </Button>
      </Sliding>
    </Sliding>
  );
};

export default Form;
