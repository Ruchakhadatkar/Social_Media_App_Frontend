import React from "react";
import "./Navbar.css";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { GrGroup } from "react-icons/gr";
import { BsMessenger } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import profilePic from "../../Asset/profillePic.jpg";

const Navbar = () => {
  return (
    <div className="navContainer">
      <div className="navbar">
        <div className="appName">
          <h4>Social</h4>
        </div>
        <ul className="middleNav">
          <li className="home">
            <HiOutlineHome />
          </li>
          <li className="video">
            <MdOutlineOndemandVideo />
          </li>
          <li className="store">
            <BiStore />
          </li>
          <li className="grp">
            <GrGroup />
          </li>
        </ul>
        <ul className="endNav">
          <li className="menugrid">
            <CgMenuGridO />
          </li>
          <li className="notification">
            <IoNotifications />
          </li>
          <li className="message">
            <BsMessenger />
          </li>
          <li className="profile">
            <img src="profilePic" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
