import { useState } from "react";
import { useRegisterInfoMutation } from "../mutations";

export const useRegisterInfo = (requestClose: (state: boolean) => void) => {
  const [name, setName] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const hasJobOptions = ["직업 없음", "직업 있음"];
  const [hasJob, setHasJob] = useState(hasJobOptions[0]);
  const [job, setJob] = useState("");
  const genderOptions = ["남자", "여자"];
  const [gender, setGender] = useState<string | null>(null);
  const [error, setError] = useState({
    name: "",
    birthYear: "",
  });
  const { mutateAsync } = useRegisterInfoMutation();

  const submit = async () => {
    if (!name) {
      setError((prev) => ({ ...prev, name: "이름을 입력해주세요." }));
      return;
    } else {
      setError((prev) => ({ ...prev, name: "" }));
    }

    if (
      !birthYear ||
      birthYear.length !== 4 ||
      isNaN(Number(birthYear)) ||
      Number(birthYear) < 1900 ||
      Number(birthYear) > new Date().getFullYear()
    ) {
      setError((prev) => ({
        ...prev,
        birthYear: "올바른 출생년도를 입력해주세요.",
      }));
      return;
    } else {
      setError((prev) => ({ ...prev, birthYear: "" }));
    }

    await mutateAsync({
      name,
      birthYear: Number(birthYear),
      job:
        hasJob === hasJobOptions[1]
          ? !job.trim()
            ? "공개 안함"
            : job.trim()
          : null,
      gender: (gender as "남자" | "여자") || null,
    });
    requestClose(true);
  };

  return {
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
  };
};
