import React from "react";
import "./HomePage.css";
import WhatsonyourMind from "../../components/WhatsonMind/WhatsonyourMind";
import RightHomebar from "../../components/RightHomebar/RightHomebar";
import LeftHomebar from "../../components/LeftHomebar/LeftHomebar";

const HomePage = () => {
  return (
    <div className="homeContainer">
      <div className="left">
        <LeftHomebar />
      </div>
      <div className="middle">
        <WhatsonyourMind />
      </div>
      <div className="right">
        <RightHomebar />
      </div>
    </div>
  );
};

export default HomePage;
