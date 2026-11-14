import { NavLink, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("fakestore-access-token");
    navigate("/login");
  };

  return (
    <aside className="w-56 border-r p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-2">Fake Store</h1>
        <nav className="flex flex-col gap-2">
          <NavLink to="/dashboard/products" className="p-2">
            Products
          </NavLink>
          <NavLink to="/dashboard/users" className="p-2">
            Users
          </NavLink>
        </nav>
      </div>

      <button onClick={logout} className="border p-2">
        Logout
      </button>
    </aside>
  );
};

export default Sidebar;
