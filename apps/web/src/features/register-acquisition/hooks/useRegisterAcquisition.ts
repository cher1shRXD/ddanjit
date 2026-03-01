import { useState } from "react";
import { useRegisterAcquisitionMutation } from "../mutations";

export const useRegisterAcquisition = (requestClose: (state: boolean) => void) => {
  const [selected, setSelected] = useState<string | null>(null);
  const options = [
    "앱스토어 추천",
    "지인 추천",
    "온라인 광고",
    "소셜 미디어",
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