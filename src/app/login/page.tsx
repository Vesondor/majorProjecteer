"use client"
import React, { useState } from "react";
import { useRouter } from 'next/navigation'; // Corrected import from 'next/router'

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>(""); // Changed from email to username for consistency with backend
  const [password, setPassword] = useState<string>("");
  const router = useRouter();

  // Function to handle login on form submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
  
    // Send a POST request to the backend with the username and password
    const response = await fetch('http://localhost:3001/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
  
    const data = await response.json();
  
    // Check if the login was successful and handle redirection based on the user's role
    if (data.loggedIn) {
      localStorage.setItem('token', data.token); // Store the token for future requests

      switch(data.role) {
        case 'translator':
          localStorage.setItem('translatorId', data.userId.toString()); // Store the userId as a string for future use
          router.push('/dashboard');
          break;
        case 'manager':
          localStorage.setItem('adminId', data.userId.toString()); // Store the userId as a string for future use
          router.push('/adminboard');
          break;
        default:
          // Handle unexpected roles or errors
          console.error('Unexpected role or error');
          alert('Unexpected role, please contact support.'); // Provide user feedback
          break;
      }
    } else {
      // Handle login failure (e.g., show an error message)
      alert('Login failed: ' + (data.error || 'Please check your username and password.'));
      console.error('Login failed', data.error);
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md px-6 py-8 mx-auto bg-white rounded shadow-md">
        <h2 className="text-4xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-6">
            <label htmlFor="username" className="form-label">
              Username <span className="text-red-500">*</span>
            </label>
            <input
              id="username"
              name="username"
              className="form-input"
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
