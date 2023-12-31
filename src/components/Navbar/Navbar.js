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
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import { useSelector } from "react-redux";

const Navbar = () => {
  // const { logout } = useLogout()
  // const { user } = useAuthContext()
  // const navigate = useNavigate()

  // const handkeClick = () => {
  //   logout();
  //   navigate("/login")
  // };

  const {user}= useSelector(state=>state.user)

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
          <div class="dropdown">
            <span>
              <div className="profile">
                <img src={profilePic} />
              </div>
            </span>
            <div class="dropdown-content">
              <Link
                to={`/profile/${user.id}`}
                style={{ textDecoration: "none", color: "gray" }}
              >
                <h3 className="drop">Profile</h3>
              </Link>

              <Link
                to="/signup"
                style={{ textDecoration: "none", color: "gray" }}
              >
                <h3 className="drop">Logout</h3>
              </Link>
            </div>
          </div>

          {/* <div className="profile">
            <img src={profilePic} />
          </div> */}
        </ul>
      </div>
      {/* <div className="signLogin">
        {user && (
          <div>
            <button onClick={handkeClick} className="logout">
              Log out
            </button>
          </div>
        )}
        {!user && (
          <div>
            <Link
              to={"/signup"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Sign up
            </Link>
            <Link
              to={"/login"}
              style={{ textDecoration: "none", color: "black" }}
            >
              Log in
            </Link>
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Navbar;

{
  /* <div class="dropdown">
  <span>
    <div className="profile">
      <img src={profilePic} />
    </div>
  </span>
  <div class="dropdown-content">
    <p>View Profile</p>
    <p>Logout</p>
  </div>
</div>; */
}
