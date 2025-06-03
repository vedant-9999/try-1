"use client";
import { useState } from "react";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage("✅ Signup successful!");
    } else {
      setMessage("❌ " + data.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Sign Up</h1>
      <input
        name="name"
        onChange={handleChange}
        placeholder="Name"
        className="border p-2 mb-2 w-full max-w-sm"
      />
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        className="border p-2 mb-2 w-full max-w-sm"
      />
      <input
        name="password"
        type="password"
        onChange={handleChange}
        placeholder="Password"
        className="border p-2 mb-4 w-full max-w-sm"
      />
      <button
        onClick={handleSignup}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Sign Up
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
}
