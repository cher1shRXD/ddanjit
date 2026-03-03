import { Button } from "@ddanjit/ui";
import Sliding from "../shared/ui/Sliding";

interface Props {
  closeRequest: boolean;
  onClick: () => void;
  text: string;
}

const QuitButton = ({ closeRequest, onClick, text }: Props) => {
  return (
    <Sliding
      direction="bottom-top"
      startPosition="400%"
      delay={0.8}
      closeRequest={closeRequest}
      closeDelay={0}
      animationStyle="bouncy">
      <Button background="transparent" size="full" onClick={onClick}>
        <p className="text-text/40">{text}</p>
      </Button>
    </Sliding>
  );
};

export default QuitButton;
