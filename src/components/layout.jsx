import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "../auth/login/Login";
import Products from "./products";
import Sidebar from "./layout/sidebar";
import Users from "./layout/users";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className="p-10 text-center">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Page not found</p>
    </div>
  );
};

const Layout = () => {
  const token = localStorage.getItem("fakestore-access-token");

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to={token ? "/dashboard" : "/login"} replace />}
        />

        <Route
          path="/dashboard"
          element={token ? <Dashboard /> : <Navigate to="/login" replace />}
        >
          <Route index element={<Navigate to="products" replace />} />
          <Route path="products" element={<Products />} />
          <Route path="users" element={<Users />} />
        </Route>

        <Route path="/login" element={<Login />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default Layout;
