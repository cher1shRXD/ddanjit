import { bundleTable } from "@ddanjit/domain";
import "dotenv/config";
import { db } from "../mysql";


export const seedBundles = async () => {
  const bundles = [
    {
      id: 1,
      name: "기본 활동 번들",
      description: "일상에서 쉽게 할 수 있는 무료 활동 모음입니다.",
      price: 0,
    },
    {
      id: 2,
      name: "프리미엄 힐링 번들",
      description: "더 깊은 휴식과 집중을 위한 유료 콘텐츠 모음입니다.",
      price: 4900,
    },
  ];

  try {
    await db.insert(bundleTable).values(bundles);
    console.log("번들 데이터 시딩 완료!");
  } catch (err) {
    console.log("번들 데이터가 이미 존재하거나 삽입에 실패했습니다. (무시 가능)");
  }
};
