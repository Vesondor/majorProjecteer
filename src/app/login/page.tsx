"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if(email&&password == 'smey'){
      router.push('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 mx-auto bg-white rounded shadow-md">
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
                  placeholder="john"
                  type="text"
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
  );
};

export default Login;
