import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../../api/axios";

import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await API.post(
        "/auth/login",
        formData
      );

      login(data);

      navigate("/");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">

      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-[400px]"
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          Login
        </h1>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full border p-3 mb-4 rounded"
          onChange={handleChange}
        />

        <button
          disabled={loading}
          className="w-full bg-black text-white py-3 rounded"
        >
          {
            loading
              ? "Loading..."
              : "Login"
          }
        </button>

        <p className="mt-4 text-center">
          Don't have an account?

          <Link
            to="/register"
            className="text-blue-500 ml-1"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;