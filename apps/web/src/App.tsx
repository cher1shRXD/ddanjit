import AnalyzeAcquisition from "./pages/AnalyzeAcquisition";
import DoneRegister from "./pages/DoneRegister";
import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import RegisterInfo from "./pages/RegisterInfo";
import { TabProvider } from "./shared/providers/tab-provider";

const App = () => {
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
        ]}
        initialKey="onboarding"
      />
    </div>
  );
};

export default App;
