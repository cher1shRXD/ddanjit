import { activityTable, SaveActivityReq } from "@ddanjit/domain";
import { db } from "../mysql";

export const seedActivities = async () => {
  const activities: SaveActivityReq[] = [
    {
      title: "지금 들리는 소리 3가지",
      bundleId: 1,
      instruction: "눈을 감고 주변의 소리에 귀를 기울여보세요.",
      icon: "sound",
      duration: "5",
      isFree: true,
      recommendAt: 14,
      content: {
        data: [
          [
            {
              name: "instruction",
              props: {
                instructions: [
                  "눈을 감고 30초간 주변 소리에 집중해보세요.",
                  "들리는 소리를 3가지 적어주세요.",
                ],
              },
            },
            { name: "timer", props: { time: 30 } },
            { name: "button", props: { text: "시작할게요", action: "next" } },
          ],
          [
            { name: "title", props: { title: "무슨 소리가 들렸나요?" } },
            {
              name: "single_line_input",
              props: {
                key: "sound_1",
                placeholder: "첫 번째 소리",
                prefix: "1.",
              },
            },
            {
              name: "single_line_input",
              props: {
                key: "sound_2",
                placeholder: "두 번째 소리",
                prefix: "2.",
              },
            },
            {
              name: "single_line_input",
              props: {
                key: "sound_3",
                placeholder: "세 번째 소리",
                prefix: "3.",
              },
            },
            {
              name: "button",
              props: {
                text: "완료",
                action: "done",
                requires: ["sound_1", "sound_2", "sound_3"],
              },
            },
          ],
        ],
        context: { endTitle: "귀가 조금 열렸나요?", endSubTitle: "" },
      },
    },
    {
      title: "오늘 감사한 것 3가지",
      bundleId: 1,
      instruction: "아무리 작은 것도 괜찮아요.",
      icon: "lightbulb",
      duration: "5",
      isFree: true,
      recommendAt: 22,
      content: {
        data: [
          [
            { name: "title", props: { title: "오늘 감사한 것 3가지" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "크든 작든 상관없어요.",
                  "지금 떠오르는 것들을 적어보세요.",
                ],
              },
            },
            {
              name: "single_line_input",
              props: { key: "g1", placeholder: "첫 번째", prefix: "1." },
            },
            {
              name: "single_line_input",
              props: { key: "g2", placeholder: "두 번째", prefix: "2." },
            },
            {
              name: "single_line_input",
              props: { key: "g3", placeholder: "세 번째", prefix: "3." },
            },
            {
              name: "button",
              props: {
                text: "완료",
                action: "done",
                requires: ["g1", "g2", "g3"],
              },
            },
          ],
        ],
        context: { endTitle: "오늘도 좋은 것들이 있었네요", endSubTitle: "" },
      },
    },
    {
      title: "지금 기분을 날씨로",
      bundleId: 1,
      instruction: "지금 이 순간의 기분을 날씨로 표현해보세요.",
      icon: "lightbulb",
      duration: "5",
      isFree: true,
      recommendAt: 10,
      content: {
        data: [
          [
            { name: "title", props: { title: "지금 기분을 날씨로 표현하면?" } },
            {
              name: "segment",
              props: {
                key: "weather",
                options: ["맑음", "흐림", "비", "폭풍"],
              },
            },
            {
              name: "button",
              props: { text: "다음", action: "next", requires: ["weather"] },
            },
          ],
          [
            { name: "title", props: { title: "왜 그 날씨인가요?" } },
            {
              name: "single_line_input",
              props: { key: "reason", placeholder: "한 줄이면 충분해요" },
            },
            {
              name: "button",
              props: { text: "완료", action: "done", requires: ["reason"] },
            },
          ],
        ],
        context: { endTitle: "오늘의 날씨를 기억할게요", endSubTitle: "" },
      },
    },
    {
      title: "목/어깨 스트레칭",
      bundleId: 1,
      instruction: "지금 당장 자리에서 할 수 있는 스트레칭이에요.",
      icon: "vision",
      duration: "5",
      isFree: true,
      recommendAt: 15,
      content: {
        data: [
          [
            { name: "title", props: { title: "목 스트레칭" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "천천히 오른쪽으로 기울여주세요.",
                  "10초간 유지해요.",
                ],
              },
            },
            { name: "timer", props: { time: 10 } },
            { name: "button", props: { text: "다음", action: "next" } },
          ],
          [
            { name: "title", props: { title: "어깨 스트레칭" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "양 어깨를 귀 쪽으로 끌어올려 주세요.",
                  "5초 유지 후 천천히 내려요.",
                ],
              },
            },
            { name: "timer", props: { time: 10 } },
            { name: "button", props: { text: "다음", action: "next" } },
          ],
          [
            { name: "title", props: { title: "어떤 느낌이었나요?" } },
            {
              name: "single_line_input",
              props: { key: "feeling", placeholder: "몸 상태를 한 줄로" },
            },
            { name: "button", props: { text: "완료", action: "done" } },
          ],
        ],
        context: { endTitle: "몸이 조금 풀렸나요?", endSubTitle: "" },
      },
    },
    {
      title: "5분 자유글쓰기",
      bundleId: 1,
      instruction: "맞춤법 틀려도 돼요. 손이 멈추지 않게만.",
      icon: "book",
      duration: "5",
      isFree: true,
      recommendAt: 21,
      content: {
        data: [
          [
            {
              name: "instruction",
              props: {
                instructions: [
                  "맞춤법 틀려도 괜찮아요.",
                  "타이머가 끝날 때까지 손이 멈추지 않게만 써주세요.",
                ],
              },
            },
            { name: "timer", props: { time: 300 } },
            {
              name: "multi_line_input",
              props: {
                key: "memo",
                placeholder: "지금 머릿속에 있는 것들을 그냥 쏟아내 보세요.",
                lines: 8,
              },
            },
            { name: "button", props: { text: "다 썼어요", action: "done" } },
          ],
        ],
        context: {
          endTitle: "5분이 지났어요",
          endSubTitle: "조금 가벼워졌나요?",
        },
      },
    },
    {
      title: "알로하로 3행시",
      bundleId: 1,
      instruction: "알, 로, 하로 시작하는 문장을 하나씩 완성해보세요.",
      icon: "book",
      duration: "5",
      isFree: true,
      recommendAt: 13,
      content: {
        data: [
          [
            { name: "title", props: { title: "알로하로 3행시 짓기" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "각 글자로 시작하는 문장을 하나씩 완성해보세요.",
                  "지금 이 순간을 담아도 좋아요.",
                ],
              },
            },
            {
              name: "word_input",
              props: {
                key: "line_1",
                prefix: "알",
                placeholder: "로 시작하는 한 줄",
              },
            },
            {
              name: "word_input",
              props: {
                key: "line_2",
                prefix: "로",
                placeholder: "로 시작하는 한 줄",
              },
            },
            {
              name: "word_input",
              props: {
                key: "line_3",
                prefix: "하",
                placeholder: "로 시작하는 한 줄",
              },
            },
            {
              name: "button",
              props: {
                text: "완료",
                action: "done",
                requires: ["line_1", "line_2", "line_3"],
              },
            },
          ],
        ],
        context: { endTitle: "오늘의 세 줄이 완성됐어요", endSubTitle: "" },
      },
    },
    {
      title: "지금 감정에 이름 붙이기",
      bundleId: 1,
      instruction: "'좋다', '피곤하다'는 탈락이에요.",
      icon: "lightbulb",
      duration: "5",
      isFree: true,
      recommendAt: 12,
      content: {
        data: [
          [
            {
              name: "instruction",
              props: {
                instructions: [
                  "'좋다', '피곤하다'는 탈락이에요.",
                  "지금 이 순간을 가장 정확하게 표현하는 단어를 만들어보세요.",
                  "없으면 합성어도 괜찮아요.",
                ],
              },
            },
            {
              name: "word_input",
              props: { key: "emotion", placeholder: "나만의 감정 단어" },
            },
            {
              name: "button",
              props: { text: "다음", action: "next", requires: ["emotion"] },
            },
          ],
          [
            { name: "title", props: { title: "왜 그 단어인가요?" } },
            {
              name: "multi_line_input",
              props: {
                key: "reason",
                placeholder: "몰라도 괜찮아요. 그냥 써보세요.",
                lines: 4,
              },
            },
            { name: "button", props: { text: "완료", action: "done" } },
          ],
        ],
        context: { endTitle: "오늘의 감정을 이름 붙였어요", endSubTitle: "" },
      },
    },
    {
      title: "지금 보이는 것 찾기",
      bundleId: 1,
      instruction: "5초간 주변을 둘러보고 눈에 들어온 것들을 적어보세요.",
      icon: "vision",
      duration: "5",
      isFree: true,
      recommendAt: 16,
      content: {
        data: [
          [
            {
              name: "instruction",
              props: {
                instructions: [
                  "타이머를 누르고 5초간 주변을 바라봐 주세요.",
                  "타이머가 종료되면 눈에 들어왔던 것들을 최대한 많이 적어주세요.",
                ],
              },
            },
            { name: "timer", props: { time: 5 } },
            { name: "button", props: { text: "다음", action: "next" } },
          ],
          [
            { name: "title", props: { title: "무엇이 눈에 들어왔나요?" } },
            { name: "infinite_word_input", props: { key: "words" } },
            {
              name: "button",
              props: { text: "완료", action: "done", requires: ["words"] },
            },
          ],
        ],
        context: { endTitle: "오늘의 풍경을 기록했어요", endSubTitle: "" },
      },
    },
    {
      title: "오늘 하루 한 문장으로",
      bundleId: 1,
      instruction: "잘됐든 망했든 한 문장이면 충분해요.",
      icon: "book",
      duration: "5",
      isFree: true,
      recommendAt: 23,
      content: {
        data: [
          [
            { name: "title", props: { title: "오늘 하루를 한 문장으로" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "잘됐든 망했든 상관없어요.",
                  "지금 이 순간 떠오르는 문장을 그대로 적어주세요.",
                ],
              },
            },
            {
              name: "single_line_input",
              props: { key: "sentence", placeholder: "오늘 하루는..." },
            },
            {
              name: "button",
              props: { text: "완료", action: "done", requires: ["sentence"] },
            },
          ],
        ],
        context: { endTitle: "오늘 하루를 기록했어요", endSubTitle: "" },
      },
    },
    {
      title: "3분 끝말잇기",
      bundleId: 1,
      instruction: "혼자서 얼마나 이어갈 수 있을까요?",
      icon: "book",
      duration: "5",
      isFree: true,
      recommendAt: 11,
      content: {
        data: [
          [
            { name: "title", props: { title: "3분 끝말잇기" } },
            {
              name: "instruction",
              props: {
                instructions: [
                  "타이머가 끝날 때까지 최대한 이어보세요.",
                  "막히면 그냥 멈춰도 괜찮아요.",
                ],
              },
            },
            { name: "timer", props: { time: 180 } },
            { name: "infinite_word_input", props: { key: "words" } },
            { name: "button", props: { text: "완료", action: "done" } },
          ],
        ],
        context: { endTitle: "몇 개나 이어갔나요?", endSubTitle: "" },
      },
    },
  ];

  await db.insert(activityTable).values(activities);
  console.log("25개의 활동 더미 데이터가 성공적으로 생성되었습니다.");
};
