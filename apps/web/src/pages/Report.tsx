import { Button } from "@ddanjit/ui";
import Screen from "../shared/providers/safe-area-provider/Screen";
import { useTab } from "../shared/providers/tab-provider/useTab"

const Report = () => {
  const tab = useTab();

  return (
    <Screen>
      <Button onClick={() => tab.move("activity-time")}>시작하기</Button>
    </Screen>
  )
}

export default Report