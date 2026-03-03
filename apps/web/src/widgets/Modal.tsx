import { useState, type ReactNode } from "react";
import Sliding from "../shared/ui/Sliding";
import Ddani from "../shared/assets/icons/Ddani";
import { useSafeArea } from "../shared/providers/safe-area-provider/useSafeArea";
import { Icon } from "@iconify/react";

interface Props {
  enterButton: ReactNode;
  quitButton?: ReactNode;
  texts?: string[];
  requestParentClose: (state: boolean) => void;
  closeModal: () => void;
}

const Modal = ({
  enterButton,
  quitButton,
  texts,
  requestParentClose,
  closeModal,
}: Props) => {
  const [closeRequest, setCloseRequest] = useState(false);
  const { bottom } = useSafeArea();
  const [isCanceled, setIsCanceled] = useState(false);

  const cancel = () => {
    setIsCanceled(true);
    setCloseRequest(true);
  };

  return (
    <Sliding
      direction="bottom-top"
      startPosition="200%"
      closeRequest={closeRequest}
      closeDelay={0.4}
      animationStyle="solid"
      onAnimationComplete={() =>
        isCanceled ? closeModal() : requestParentClose(true)
      }
      className="fixed bottom-0 right-0 z-10 flex flex-col w-full px-4 h-90 modal rounded-t-4xl"
      style={{ paddingBottom: bottom }}>
      <div className="flex justify-end w-full">
        <Icon
          icon="material-symbols:close"
          className="w-6 h-6 mt-4 text-text/40"
          onClick={cancel}
        />
      </div>
      <div className="flex items-center flex-1 w-full gap-1">
        <Ddani size={70} />
        <div className="flex flex-col items-start justify-center flex-1 gap-0.5">
          {texts?.map((text, index, arr) => (
            <pre
              key={index}
              className="px-4 py-5 text-sm text-white rounded-4xl bg-primary text-wrap"
              style={
                index === 0
                  ? { borderBottomLeftRadius: 0 }
                  : index === arr.length - 1
                    ? { borderTopLeftRadius: 0 }
                    : { borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }
              }>
              {text}
            </pre>
          ))}
        </div>
      </div>
      <div className="flex flex-col w-full gap-5">
        <Sliding
          direction="bottom-top"
          startPosition="400%"
          delay={0.2}
          closeRequest={closeRequest}
          closeDelay={0.2}
          animationStyle="bouncy"
          className="w-full">
          <div className="w-full" onClick={() => setCloseRequest(true)}>
            {enterButton}
          </div>
        </Sliding>
        <Sliding
          direction="bottom-top"
          startPosition="400%"
          delay={0.3}
          closeRequest={closeRequest}
          closeDelay={0}
          animationStyle="bouncy"
          className="w-full">
          <div className="w-full" onClick={() => setCloseRequest(true)}>
            {quitButton}
          </div>
        </Sliding>
      </div>
    </Sliding>
  );
};

export default Modal;
