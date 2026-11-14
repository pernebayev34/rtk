import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuthUserMutation } from "../../api/apislice";

const Login = () => {
  const token = localStorage.getItem("fakestore-access-token");
  const navigate = useNavigate();
  const [authUser, { isLoading }] = useAuthUserMutation();
  const [form, setForm] = useState({ username: "", password: "" });

  if (token) return <Navigate to="/dashboard" replace />;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await authUser(form).unwrap();
      localStorage.setItem("fakestore-access-token", result.token);
      toast.success("Successfully logged in!");
      navigate("/dashboard");
    } catch {
      toast.error("Invalid username or password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 border p-4 w-80">
        <h1 className="text-xl font-bold">Login</h1>

        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          required
          className="border p-2"
        />
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          required
          className="border p-2"
        />

        <button type="submit" disabled={isLoading} className="border p-2">
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
