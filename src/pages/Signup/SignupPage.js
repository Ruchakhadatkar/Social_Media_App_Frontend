import React from "react";
import { useState } from "react";
import "./SignupPage.css";
import { useSignup } from "../../hooks/useSignup";
import { Link, useNavigate } from "react-router-dom";

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
    // console.log(name, contact, email, dateofBirth, gender, city, password)
    await signup(name, contact, email, dateofBirth, gender, city, password);
    navigate("/");
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
        <div className="genderType">
          <label htmlFor="">Male</label>
          <input
            type="radio"
            name="gender"
            value="male"
            className="radio"
            onClick={(e) => setGender(e.target.value)}
          />
          <div className="female">
            <label htmlFor="">Female</label>
            <input
              type="radio"
              name="gender"
              value="female"
              className="radio"
              onClick={(e) => setGender(e.target.value)}
            />
          </div>
          <label htmlFor="">Custom</label>
          <input
            type="radio"
            name="gender"
            value="custom"
            className="radio"
            onClick={(e) => setGender(e.target.value)}
          />
        </div>
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
        <button disabled={isLoading} className="signBtn">
          Sign up
        </button>
        <hr className="line" />
        <Link to={"/login"} style={{ textDecoration: "none", color: "gray" }}>
          <p className="already">
            Already have an account <span className="loginSpan"> Log In</span>{" "}
          </p>
        </Link>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
