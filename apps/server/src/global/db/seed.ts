import { seedBundles } from "./seeds/bundle";
import { seedActivities } from "./seeds/activity";

const main = async () => {
  console.log("시딩 프로세스 시작...");
  try {
    // 1. 번들(외래 키 대상) 먼저 생성
    await seedBundles();
    // 2. 활동 데이터 생성
    await seedActivities();
    console.log("모든 시딩 완료!");
  } catch (error) {
    console.error("시딩 중 치명적 오류 발생:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
};

main();
