import { Route, Routes } from "react-router-dom";
import { PATH } from "../components";
import { Login, NotFound, Register } from "../pages";

const AuthRoute = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Login />} />
      <Route path={PATH.register} element={<Register />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AuthRoute;
