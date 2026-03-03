import { useEffect } from "react";
import ActivityFound from "./pages/ActivityFound";
import ActivityTime from "./pages/ActivityTime";
import AnalyzeAcquisition from "./pages/AnalyzeAcquisition";
import DoneRegister from "./pages/DoneRegister";
import FindActivity from "./pages/FindActivity";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import RegisterInfo from "./pages/RegisterInfo";
import { storage } from "./shared/libs/storage/storage";
import { TabProvider } from "./shared/providers/tab-provider";
import RefindActivity from "./pages/RefindActivity";
import ActivityRefound from "./pages/ActivityRefound";

const App = () => {
  const currentTab = storage.getItem("current-tab") || "onboarding";

  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div className="w-full h-screen">
      <TabProvider
        activities={[
          {
            key: "onboarding",
            component: <Onboarding />,
          },
          { key: "login", component: <Login /> },
          { key: "register-info", component: <RegisterInfo /> },
          { key: "analyze-acquisition", component: <AnalyzeAcquisition /> },
          { key: "done-register", component: <DoneRegister /> },
          { key: "activity-time", component: <ActivityTime /> },
          { key: "activity-find", component: <FindActivity /> },
          { key: "activity-found", component: <ActivityFound /> },
          { key: "activity-refind", component: <RefindActivity /> },
          { key: "activity-refound", component: <ActivityRefound /> },
        ]}
        initialKey={currentTab}
      />
    </div>
  );
};

export default App;
