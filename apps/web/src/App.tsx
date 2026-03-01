import Login from "./pages/Login";
import Onboarding from "./pages/Onboarding";
import { TabProvider } from "./shared/providers/tab-provider";

const App = () => {
  return (
    <div className="w-full h-screen">
      <TabProvider
        activities={[
          { key: "onboarding", component: <Onboarding /> },
          { key: "login", component: <Login /> },
        ]}
        initialKey="onboarding"
      />
    </div>
  );
};

export default App;
