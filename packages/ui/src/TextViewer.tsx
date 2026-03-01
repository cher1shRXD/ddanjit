import { useState } from "react";

interface Props {
  title: string;
  contents: string[];
}

export const TextViewer = ({ title, contents }: Props) => {
  const [page, setPage] = useState(0);

  const handleNext = () => {
    setPage((prev) => (prev + 1) % contents.length);
  }

  return (
    <div className="w-full bg-static-green px-6 py-8 text-white rounded-4xl flex flex-col gap-8 active:scale-98 transition-transform" onClick={handleNext}>
      <h2 className="text-3xl font-bold">{title}</h2>
      <pre className="text-[20px] font-semibold text-wrap leading-8">{contents[page]}</pre>
      <p className="text-sm self-end pt-8">
        {page + 1} of {contents.length}
      </p>
    </div>
  );
};
