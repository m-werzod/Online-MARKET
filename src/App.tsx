import { useContext } from "react";
import { Context } from "./context/app-context";
import AuthRoute from "./routes/AuthRoute";
import DashboardRoute from "./routes/DashboardRoute";

const App = () => {
  const { token } = useContext(Context);

  return token ? <DashboardRoute /> : <AuthRoute />;
};

export default App;
