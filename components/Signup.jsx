import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Signin.css";

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    const existingUser = JSON.parse(localStorage.getItem("user"));
    if (existingUser) {
      setErrorMessage("User already exists. Please log in.");
      return;
    }

    const newUser = { username, email, password };
    localStorage.setItem("user", JSON.stringify(newUser));
    setSuccessMessage("User created successfully. You can now log in.");
    setFormData({ username: "", email: "", password: "" });
    setErrorMessage("");
    setTimeout(() => navigate("/login"), 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-200 via-blue-100 to-purple-200">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 text-center">
        <h1 className="text-4xl font-bold text-purple-600 mb-4">Welcome to E-Shopper</h1>
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="text-red-500 text-sm text-center mt-4">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 text-sm text-center mt-4">{successMessage}</p>}

        <p className="text-sm text-gray-600 text-center mt-6">
          Already have an account?{" "}
          <a href="/" className="text-blue-500 font-medium hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
