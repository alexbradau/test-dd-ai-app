import { useNavigate } from "react-router-dom";
import { useState } from "react";

const NewAccount = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Account Created:", formData);
    navigate("/"); // Redirect to Home after signup
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create a New Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required className="p-3 border border-gray-300 rounded" />
          <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required className="p-3 border border-gray-300 rounded" />
          <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required className="p-3 border border-gray-300 rounded" />
          <button type="submit" className="bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition">Sign Up</button>
        </form>
        <button onClick={() => navigate("/")} className="mt-4 text-blue-600 hover:underline">← Back to Home</button>
      </div>
    </div>
  );
};

export default NewAccount;