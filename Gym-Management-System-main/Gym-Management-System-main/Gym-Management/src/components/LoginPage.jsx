import React, { useState } from 'react';

function LoginPage({ login }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (username === 'admin' && password === 'admin') {
      login();
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Sign in to GYMEX</h1>
        <h6 className="text-gray-600 mb-6 text-center">Please login with your details</h6>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="username">Email</label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleLogin}
          className="w-full bg-black text-white p-2 rounded hover:bg-gray-500"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
