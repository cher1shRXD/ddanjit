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
import ActivityList from "./pages/ActivityList";
import FindShortActivity from "./pages/FindShortActivity";
import ShortActivityFound from "./pages/ShortActivityFound";
import ActivityPlay from "./pages/ActivityPlay";
import ActivitySave from "./pages/ActivitySave";
import ActivityStart from "./pages/ActivityStart";
import Report from "./pages/Report";

const App = () => {
  const currentTab = storage.getItem("current-tab") || "onboarding";

  return (
    <div className="w-full h-screen">
      <TabProvider
        activities={{
          onboarding: <Onboarding />,
          login: <Login />,
          "register-info": <RegisterInfo />,
          "analyze-acquisition": <AnalyzeAcquisition />,
          "done-register": <DoneRegister />,
          "activity-time": <ActivityTime />,
          "activity-find": <FindActivity />,
          "activity-found": <ActivityFound />,
          "activity-refind": <RefindActivity />,
          "activity-refound": <ActivityRefound />,
          "activity-list": <ActivityList />,
          "activity-find-short": <FindShortActivity />,
          "activity-found-short": <ShortActivityFound />,
          activity: <ActivityPlay />,
          "activity-save": <ActivitySave />,
          "activity-start": <ActivityStart />,
          "report": <Report />
        }}
        initialKey={currentTab}
      />
    </div>
  );
};

export default App;
