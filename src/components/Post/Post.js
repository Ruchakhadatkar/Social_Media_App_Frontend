import React from "react";
import "./Post.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Profilepic from "../../Asset/profillePic.jpg";
import postImg from "../../Asset/post-pic.jpg";

const Post = () => {
  return (
    <div className="postCotainer">
      <div className="upperPost">
        <img src={Profilepic} />
        <div className="postTime">
          <p className="userNameP">User Name</p>
          <p className="time">
            yesterday at 9pm <FaGlobeAmericas className="globe" />
          </p>
        </div>
        <div className="listIcon">
          <FiMoreHorizontal className="more" />
        </div>
      </div>
      <div className="postDescrip">
        <p>FullStack Development in Fun</p>
      </div>
      <div className="postImg">
        <img src={postImg} />
      </div>
      {/* <hr /> */}
      <div className="lower">
        {/* <div className="lowerIcon"> */}
          <div className="like">
            <AiOutlineLike className="icon" />
            <p>Like</p>
          </div>

          <div className="comment like">
            <FaRegComment className="iconC" />
            <p>Comment</p>
          </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Post;
