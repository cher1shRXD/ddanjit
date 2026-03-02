import { useRegisterAcquisitionMutation } from "../mutations";
import { usePersistedState } from "../../../shared/providers/snapshot-provider/usePersistedState";

export const useRegisterAcquisition = (requestClose: (state: boolean) => void) => {
  const [selected, setSelected] = usePersistedState<string | null>(null, "selected");
  const options = [
    "앱스토어 추천",
    "지인 추천",
    "SNS 광고 (유튜브, 인스타그램 등)",
    "커뮤니티",
    "기타",
  ];
  const [otherSource, setOtherSource] = usePersistedState("", "otherSource");
  const { mutateAsync } = useRegisterAcquisitionMutation();

  const submit = async () => {
    await mutateAsync({ acquisitionSource: selected === "기타" ? otherSource : selected });
    requestClose(true);
  };

  return {
    selected,
    setSelected,
    options,
    otherSource,
    setOtherSource,
    submit,
  };
}