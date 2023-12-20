import React from "react";
import { useState } from "react";
import  "./SignupPage.module.css";
import { useSignup } from "../../hooks/useSignup";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [dateofBirth, setDateofBirth] = useState("");
  const [gender, setGender] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await signup(name, contact, email, dateofBirth, gender, city, password);
    // navigate("/");
  };
  return (
    <div className="signupContainer">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>

        <label>Name</label>
        <input
          type="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <label>Contact</label>
        <input
          type="contact"
          onChange={(e) => setContact(e.target.value)}
          value={contact}
        />

        <label>Email</label>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <label>Date of Birth</label>
        <input
          type="date"
          onChange={(e) => setDateofBirth(e.target.value)}
          value={dateofBirth}
        />

        <label>Gender</label>
        <input
          type="gender"
          onChange={(e) => setGender(e.target.value)}
          value={gender}
        />

        <label>City</label>
        <input
          type="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
        />

        <label>Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />

        <button disabled={isLoading} className="signup">
          Sign up
        </button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;