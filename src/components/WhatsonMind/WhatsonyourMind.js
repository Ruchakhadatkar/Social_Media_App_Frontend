import React from "react";
import "./WhatsonyourMind.css";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import profilePic from "../../Asset/profillePic.jpg";

const WhatsonyourMind = () => {
  return (
    <div className="mainContainer">
      <div className="middleUpper">
        <div className="upper">
          <img src={profilePic} />
          <input type="text" placeholder="What's on your mind, userName ?" />
        </div>
        <hr />
        <div className="PostIcon">
          <div className=" activity">
            <IoVideocamSharp className="videoLive icon"/>
            <p>Live video</p>
          </div>
          <div className=" activity">
            <MdOutlinePhotoLibrary  className="photos icon"/>
            <p>Photo/Video</p>
          </div>
          <div className=" activity">
            <GoSmiley className="smiley icon"  />
            <p>Feeling/Activity</p>
          </div>
        </div>
        <button>Post</button>
      </div>
      <div className="postContainer"></div>
    </div>
  );
};

export default WhatsonyourMind;
