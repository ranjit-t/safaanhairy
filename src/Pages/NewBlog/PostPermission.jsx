import React, { useState } from "react";

const PostPermission = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    // Check if the entered username and password match the hardcoded values
    if (username === "safaa" && password === "safaa") {
      onLogin();
    } else {
      setErrorMessage("Invalid username or password. Please try again.");
    }
  };

  return (
    <div className="h-[78vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-2xl max-w-xs w-full">
        <h2 className="text-md font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded-md mb-2 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded-md mb-4 px-3 py-2 focus:outline-none focus:border-blue-500"
          />
          <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
            Login
          </button>
        </form>
        {errorMessage && (
          <div className="mt-4 text-red-600 text-center">{errorMessage}</div>
        )}
      </div>
    </div>
  );
};

export default PostPermission;
