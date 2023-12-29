import React from "react";
import "./HomePage.css";
import WhatsonyourMind from "../../components/WhatsonMind/WhatsonyourMind";
import RightHomebar from "../../components/RightHomebar/RightHomebar";
import LeftHomebar from "../../components/LeftHomebar/LeftHomebar";
import Post from "../../components/Post/Post";
import { useSelector } from "react-redux";

const HomePage = () => {
  // const state = useSelector(state=>state)
  // console.log(state)
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
