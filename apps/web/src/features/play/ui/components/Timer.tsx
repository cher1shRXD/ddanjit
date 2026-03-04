import { Timer as Ui } from "@ddanjit/ui";

interface Props {
  time: number;
  autoStart: boolean;
  onEnd: () => void;
}

export const Timer = ({ time, autoStart, onEnd }: Props) => (
  <Ui
    totalSeconds={time}
    autoStart={autoStart}
    onEnd={onEnd}
  />
);
