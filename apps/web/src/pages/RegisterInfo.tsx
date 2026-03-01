import { useState } from "react";
import { Spacer } from "../../../../packages/ui/src/Spacer";
import Screen from "../shared/providers/safe-area-provider/Screen";
import Sliding from "../shared/ui/Sliding";
import Footer from "../widgets/Footer";
import Form from "../features/register-info/ui/Form";

const RegisterInfo = () => {
  const [closeRequest, setCloseRequest] = useState(false);

  return (
    <Screen className="flex flex-col gap-5">
      <Spacer height={60} />
      <Sliding
        direction="left-right"
        startPosition="150%"
        closeRequest={closeRequest}
        closeDelay={0.2}
        animationStyle="bouncy">
        <h1 className="text-4xl font-bold">반가워요</h1>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.2}
        closeRequest={closeRequest}
        closeDelay={0.3}
        animationStyle="bouncy">
        <h2 className="text-2xl font-semibold">
          뭐라고 부르면 될까요?
          <br />
          당신을 소개해 주세요!
        </h2>
      </Sliding>
      <Sliding
        direction="left-right"
        startPosition="150%"
        delay={0.4}
        closeRequest={closeRequest}
        closeDelay={0.4}
        animationStyle="bouncy">
        <p>성별 및 이름과 나이, 직업을 알려주세요.</p>
      </Sliding>
      <Spacer height={0} />
      <Form closeRequest={closeRequest} requestClose={setCloseRequest} />
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

export default RegisterInfo;
