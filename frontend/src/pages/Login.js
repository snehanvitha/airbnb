import { useState } from "react";
import API from "../api";

function Login() {
  const [data, setData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async () => {
    if (!data.email || !data.password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/auth/login", data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", data.email);

      alert("Login Successful!");
      window.location.href = "/";
    } catch (err) {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Login
        </h2>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-red-400"
          onChange={e => setData({ ...data, password: e.target.value })}
        />

        {/* Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition"
        >
          Login
        </button>

        {/* Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-red-500 cursor-pointer"
            onClick={() => (window.location.href = "/register")}
          >
            Register
          </span>
        </p>

      </div>

    </div>
  );
}

export default Login;