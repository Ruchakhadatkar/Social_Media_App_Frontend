import React from "react";
import "./Navbar.css";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { HiOutlineUserGroup } from "react-icons/hi";
import profilePic from "../../Asset/profillePic.jpg";
import { IoSearch } from "react-icons/io5";

const Navbar = () => {
  return (
    <div className="navContainer">
      <div className="navbar">
        <div className="startNav">
          <h4>Social</h4>
          <div className="search">
            <div className="searchBar">
              <input type="text" placeholder="Search..." />
              <div className="searchI">
                <IoSearch />
              </div>
            </div>
          </div>
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
            <HiOutlineUserGroup />
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
          <div className="profile">
            <img src={profilePic} />
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
