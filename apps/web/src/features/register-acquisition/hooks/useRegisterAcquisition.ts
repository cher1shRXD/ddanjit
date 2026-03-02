import { useState } from "react";
import { useRegisterAcquisitionMutation } from "../mutations";

export const useRegisterAcquisition = (requestClose: (state: boolean) => void) => {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    "앱스토어 추천",
    "지인 추천",
    "SNS 광고 (유튜브, 인스타그램 등)",
    "커뮤니티",
    "기타",
  ];
  const [otherSource, setOtherSource] = useState("");
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