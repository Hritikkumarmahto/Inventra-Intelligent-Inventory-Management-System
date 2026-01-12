import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../Services/api";

function Auth() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const role = params.get("role");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const register = async () => {
    try {
      await registerUser({ username, password, role });
      alert("Registered successfully");
    } catch {
      alert("Registration failed");
    }
  };

  const login = async () => {
    try {
      const res = await loginUser({ username, password });
      localStorage.setItem("token", res.data);
      localStorage.setItem("role", role);

      if (role === "ROLE_ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/user/dashboard");
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl w-96">
      <h2 className="text-xl font-bold text-center mb-4">
        {role === "ROLE_ADMIN" ? "Admin Login" : "User Login"}
      </h2>

      <input
        className="w-full border p-2 rounded mb-3"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        className="w-full border p-2 rounded mb-4"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="w-full bg-green-600 text-white py-2 rounded mb-2"
        onClick={login}
      >
        Login
      </button>

      <button
        className="w-full bg-gray-800 text-white py-2 rounded"
        onClick={register}
      >
        Create New Account
      </button>
    </div>
  );
}

export default Auth;
