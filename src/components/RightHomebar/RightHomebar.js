import React from "react";
import "./RightHomebar.css";
import ProfilePic from "../../Asset/profillePic.jpg";
import { IoSearch } from "react-icons/io5";

const RightHomebar = () => {
  return (
    <div className="RightCotainer">
      <div className="frindReq">
        <div className="heding">
          <p className="request">Friend Request</p>
          <p className="see">See All</p>
        </div>
        <div className="req">
          <div className="userInfo">
            <div className="userreq">
              {" "}
              <img src={ProfilePic} />
              <div className="name">
                <p className="user">User Name</p>
                <p className="mutual">11 mutual friends</p>
              </div>
            </div>
          </div>
          <div className="btns">
            <button className="crnfm">Confirm</button>
            <button className="delt">Delete</button>
          </div>
        </div>
      </div>
      <div className="findFriend">
        <div className="head">
          <p className="find">Find Friend</p>
          <IoSearch className="searchFrend" />
        </div>
        <div className="profileFrd">
          <img src={ProfilePic} />
          <p className="userName">Tom & Jerry</p>
        </div>
      </div>
    </div>
  );
};

export default RightHomebar;
