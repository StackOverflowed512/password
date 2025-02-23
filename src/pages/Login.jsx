import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    try {
      const res = await fetch("http://localhost:5007/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("Signup successful! Please login.");
        setActiveTab("login");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error signing up.");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:5007/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        alert(`Welcome, ${data.message}`);
        navigate("/home");
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("Error logging in.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-black to-purple-200">
      <div className="bg-white shadow-lg rounded-2xl p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          {activeTab === "login" ? "Login Form" : "Signup Form"}
        </h1>
        <div className="flex justify-center mb-6">
          <button className={`py-2 px-4 rounded-l-full ${activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setActiveTab("login")}>Login</button>
          <button className={`py-2 px-4 rounded-r-full ${activeTab === "signup" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`} onClick={() => setActiveTab("signup")}>Signup</button>
        </div>

        {activeTab === "login" ? (
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-lg" />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">Login</button>
          </form>
        ) : (
          <form onSubmit={handleSignup}>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
              <input type="text" name="name" placeholder="Full Name" className="w-full p-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded-lg" />
            </div>
            <div className="mb-4">
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded-lg" />
            </div>
            <button type="submit" className="w-full py-2 bg-blue-500 text-white rounded-lg">Signup</button>
          </form>
        )}
      </div>
    </div>
  );
}
