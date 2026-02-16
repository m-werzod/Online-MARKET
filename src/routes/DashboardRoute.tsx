import { Navigate, Route, Routes } from "react-router-dom";
import { PATH } from "../components";
import { Category, Home, NotFound, Products } from "../pages";

const DashboardRoute = () => {
  return (
    <Routes>
      <Route path={PATH.login} element={<Navigate to={PATH.home} replace />} />
      <Route path={PATH.home} element={<Home />} />
      <Route path={PATH.products} element={<Products />} />
      <Route path={PATH.category} element={<Category />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default DashboardRoute;
