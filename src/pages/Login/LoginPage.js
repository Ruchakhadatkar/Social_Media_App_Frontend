import React from "react";
import { useState } from "react";
import "./LoginPage.css";
import { useLogin } from "../../hooks/useLogin";
import { Link, Navigate, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await login(email, password);
    navigate("/");
  };

  return (
    <div className="loginContainer">
      <form className="login" onSubmit={handleSubmit}>
        <h3>Login</h3>
        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button disabled={isLoading} className="loginBtn">
          Login
        </button>
        <hr className="line"/>
        <Link to={"/signup"}>
        <button className="newAccount">Create New Account</button>
        </Link>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default LoginPage;
