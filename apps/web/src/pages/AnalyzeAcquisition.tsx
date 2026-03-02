import { useState } from "react";
import { Spacer } from "../../../../packages/ui/src/Spacer";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import Footer from "../widgets/Footer";
import { Button, SingleLineInput, SingleSelect } from "@ddanjit/ui";
import { useTab } from "../shared/providers/tab-provider/useTab";
import { useRegisterAcquisition } from "../features/register-acquisition/hooks/useRegisterAcquisition";

const AnalyzeAcquisition = () => {
  const tab = useTab();
  const [closeRequest, setCloseRequest] = useState(false);
  const {
    options,
    selected,
    setSelected,
    otherSource,
    setOtherSource,
    submit,
  } = useRegisterAcquisition(setCloseRequest);

  return (
    <Screen className="flex flex-col flex-1 gap-5">
      <Spacer height={60} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">거의 다 왔어요</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">
          여기까지 닿다니,
          <br />
          운명인가 봐요!
        </h2>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <p>딴짓을 어떻게 알게되었나요? </p>
      </Sliding>
      <Spacer height={0} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy"
        className="space-y-3">
        <SingleSelect
          options={options}
          selected={selected}
          onChange={setSelected}
          rounded={16}
        />
        {selected === "기타" && (
          <SingleLineInput
            value={otherSource}
            onChange={setOtherSource}
            label="딴짓을 알게된 자세한 경로를 알려주세요!"
            placeholder="지하철에서 옆사람이 하는거 봄"
          />
        )}
      </Sliding>
      <Spacer />
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.5}
        animationStyle="bouncy"
        onAnimationComplete={() => tab.move("done-register")}>
        <Button
          background="primary"
          size="full"
          className="text-white"
          onClick={submit}>
          다음
        </Button>
      </Sliding>
      <Sliding
        direction="bottom-top"
        startPosition="400%"
        delay={0.8}
        closeRequest={closeRequest}
        closeDelay={0}
        animationStyle="bouncy">
        <Footer />
      </Sliding>
    </Screen>
  );
};

export default AnalyzeAcquisition;
