import type { ContentData } from "../types";

export const data = {
  id: 1,
  title: "가끔은 세상도 좀 보고",
  instruction: "5초간 주변을 둘러보고 눈을 사로잡은 것들 적어보기",
  icon: "vision",
  duration: 1,
  bundleId: 1,
  content: {
    data: [
      [
        { name: "title", props: { title: "3분 끝말잇기" } },
        { name: "timer", props: { time: 180, autoStart: true, endAction: "done" } },
        { name: "infinite_word_input", props: { key: "words" } },
      ],
    ],
    context: { endTitle: "몇 개나 이어갔나요?", endSubTitle: "" },
  } as ContentData,
};
