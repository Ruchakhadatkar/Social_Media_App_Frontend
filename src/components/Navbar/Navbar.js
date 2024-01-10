import React from "react";
import "./Navbar.css";
import { HiOutlineHome } from "react-icons/hi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { BiStore } from "react-icons/bi";
import { BsMessenger } from "react-icons/bs";
import { IoNotifications } from "react-icons/io5";
import { CgMenuGridO } from "react-icons/cg";
import { HiOutlineUserGroup } from "react-icons/hi";
import { IoSearch } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useSelector((state) => state.user);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="navContainer">
      <div className="navbar">
        <div className="startNav">
          <h4 className="appname"
            onClick={() => {
              navigate("/");
            }}
          >
            <span> Social</span> App
           
          </h4>
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
          <li
            className="home"
            onClick={() => {
              navigate("/");
            }}
          >
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
          <div className="dropdown">
            <span>
              <div className="profile">
                <img
                className="endNavImg"
                  alt="user Image"
                  src={
                    user?.profilePicture
                      ? user.profilePicture
                      : "../defaultUser.jpg"
                  }
                />
              </div>
            </span>
            {user ? (
              <div className="dropdown-content" style={{cursor:"pointer"}}>
                <Link
                  to={`/profile/${user.id}`}
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  <h3 className="drop">Profile</h3>
                </Link>

                <div
                  style={{ textDecoration: "none", color: "gray" }}
                >
                  <h3 className="drop" onClick={handleLogout}>
                    Logout
                  </h3>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
