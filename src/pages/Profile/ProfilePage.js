import React from "react";
import "./ProfilePage.css";
import backgroundImg from "../../Asset/backgroundProfile.jpg";
import ProfileImg from "../../Asset/profillePic.jpg";

const ProfilePage = () => {
  return (
    <>
      <div className="MainContainer">
        <div className="profileContainer">
          <div className="background">
            <img src={backgroundImg} className="backgroundImg" />
          </div>
          <div className="profile">
            <img src={ProfileImg} className="ProfileImage" />
            <p>User name</p>
          </div>
          <div className="userInfo">
            <h3 className="heading">User Information</h3>
            <div className="info">
              <p>
                <span>City :</span> Wardha
              </p>
              <p>
                <span>DOB :</span> 00/00/0000
              </p>
              <p>
                <span>Contact :</span> 000000
              </p>
            </div>
          </div>
          <div className="btn">
            <button className="friend">Friend</button>
            <button className="unfriend">Unfriend</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
