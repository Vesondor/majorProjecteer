"use client"
import React, { useState } from "react";

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    // Perform login logic here, e.g., calling an API with email and password

    // Assuming a successful login, redirect to a dashboard or another page
  };

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto md:col-10 lg:col-6">
          <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="email" className="form-label">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                name="email"
                className="form-input"
                placeholder="example@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="form-label">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                className="form-input"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary flex items-center">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="py-20"></div> {/* Added space for the footer */}
    </div>
  );
};

export default Login;
