import React, { useState } from "react";
import { auth } from "../../FireBase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // setErrorMessage("logged in");
      navigate(-1);
    } catch (error) {
      //   console.log(error);
      setErrorMessage("check your email and password");
    }
  };

  return (
    <div className="form-page flex flex-col items-center justify-center h-[70vh]">
      <h1 className="form-title">Connexion</h1>
      <form
        onSubmit={handleSubmit}
        className="login-form w-[90vw] sm:w-[400px] "
      >
        <div className="flex flex-col mt-4">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
            placeholder="Email"
            className="border border-1 border-black rounded-lg p-2"
            required
          />
        </div>

        <div className="flex flex-col mt-4">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
            value={password}
            placeholder="Mot de passe"
            className="border border-1 border-black rounded-lg p-2"
            required
          />
        </div>
        {errorMessage && (
          <div className="mt-2 text-red-600">{errorMessage}</div>
        )}
        <button
          type="submit"
          className="form-submit-btn bg-blue-500 hover:bg-blue-600  mx-auto text-white mt-4 px-4 py-2"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default Login;
