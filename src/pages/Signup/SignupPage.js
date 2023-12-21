import React from "react";
import { useState } from "react";
import "./SignupPage.css";
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

        <div>
          <label htmlFor="">male</label>
          <input type="radio" name="gender" value={gender}/>
          <label htmlFor="">female</label>
          <input type="radio" name="gender" value={gender}/>
          <label htmlFor="">custiom</label>
          <input type="radio" name="gender" value={gender}/>


        </div>

        {/* <div className="genderCon">
          <label> Gender</label>
          <div className="genderOptn">
            <span>
              <label>Female</label>
              <input type="radio" placeholder="Female" />
            </span>

            <span>
              <label>Male</label>
              <input type="radio" placeholder="Male" />
            </span>
            <span>
              <label>Custom</label>
              <input type="radio" placeholder="Custom" />
            </span>
          </div>
        </div> */}

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
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default SignupPage;
