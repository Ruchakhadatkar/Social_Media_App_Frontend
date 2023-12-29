import React, { useEffect, useState } from "react";
import "./Post.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import Profilepic from "../../Asset/profillePic.jpg";
import postImg from "../../Asset/post-pic.jpg";
import { useSelector } from "react-redux";
import axios from "axios";

const Post = () => {
  const { user } = useSelector((state) => state.user);
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    getAllPost();
  }, []);
  const getAllPost = async () => {
    const data = await axios.get(`/api/post?id=${user.id}`);
    console.log(data);
    setPosts(data.data);
  };

  const likePost= async(postId)=>{
    const data = await axios.post(`/api/likes`,
    {
      userId: user.id,
      postId: postId
    }
    )
    console.log(data)
  }

  const disLikePost = async(postId)=>{
    const data = await axios.delete(`/api/likes?userId=${user.id}&postId=${postId}`)
    console.log(data)
  }
  return (
    <>
      {posts.map((post) => {
        return (
          <div className="postCotainer">
            <div className="upperPost">
              <img src={Profilepic} />
              <div className="postTime">
                <p className="userNameP">{post.userId.name}</p>
                <p className="time">
                  yesterday at 9pm <FaGlobeAmericas className="globe" />
                </p>
              </div>
              <div className="listIcon">
                <FiMoreHorizontal className="more" />
              </div>
            </div>
            <div className="postDescrip">
              <p>{post.caption}</p>
            </div>
            <div className="postImg">
              <img src={post.image} />
            </div>
            {/* <hr /> */}
            <div className="lower">
              {/* <div className="lowerIcon"> */}
              
              <div className="like" onClick={()=>{likePost(post._id)}}>
                <AiOutlineLike className="icon" />
                <p >Like</p>
              </div>

              <div className="like" onClick={()=>{disLikePost(post._id)}}>
                <AiOutlineLike className="icon" />
                <p >DisLike</p>
              </div>

              <div className="comment like">
                <FaRegComment className="iconC" />
                <p>Comment</p>
              </div>
              {/* </div> */}
            </div>
          </div>
        );
      })}
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
    </>
  );
};

export default Post;
