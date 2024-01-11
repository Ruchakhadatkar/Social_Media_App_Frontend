import React, { useEffect, useState } from "react";
import "./Post.css";
import { FaGlobeAmericas } from "react-icons/fa";
import { FiMoreHorizontal } from "react-icons/fi";
import { AiOutlineLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { FETCH_POSTS } from "../../Redux/Posts/postsTypes";
import { Link } from "react-router-dom";
import _debounce from "lodash/debounce";
import "react-loading-skeleton/dist/skeleton.css";
import Timestamp from "react-timestamp";

const Post = () => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPost();
  }, [user]);

  const getAllPost = async () => {
    setIsLoading(true);
    const data = await axios.get(
      `https://social-app-vt3a.onrender.com/api/post?id=${user.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data);
    dispatch({ type: FETCH_POSTS, payload: data.data });
    setIsLoading(false);
  };

  const likePost = async (postId) => {
    const data = await axios.post(
      `https://social-app-vt3a.onrender.com/api/likes`,
      {
        userId: user.id,
        postId: postId,
      },
      {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    console.log(data);
    getAllPost();
  };

  const disLikePost = async (postId) => {
    const data = await axios.delete(
      `https://social-app-vt3a.onrender.com/api/likes?userId=${user.id}&postId=${postId}`,
      {
        headers: {
          // Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    getAllPost();
  };

  const checkedLikePost = (likedUsers) => {
    const isLiked = likedUsers.some((item) => item.userId._id == user.id);
    return isLiked;
  };

  return (
    <>
      {posts.length > 0 &&
        posts.map((post, i) => {
          return (
            <div className="postCotainer" key={i}>
              <div className="upperPost">
                <img className="postImgUser" src={post.userId.profilePicture} />
                <div className="postTime">
                  <Link
                    to={`/profile/${post.userId._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <p className="userNameP">{post.userId.name}</p>
                  </Link>
                  <p className="time">
                    <Timestamp date={post.postDate} relative />{" "}
                    <FaGlobeAmericas className="globe" />
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
                {checkedLikePost(post.likedUsers) ? (
                  <div
                    className="like"
                    onClick={() => {
                      disLikePost(post._id);
                    }}
                  >
                    <AiOutlineLike className="icon" style={{ color: "blue" }} />
                    <p>Like</p>
                    {post.likedUsers.length}
                  </div>
                ) : (
                  <div
                    className="like"
                    onClick={() => {
                      likePost(post._id);
                    }}
                  >
                    <AiOutlineLike className="icon" style={{ color: "grey" }} />
                    <p>Like</p>
                    {post.likedUsers.length}
                  </div>
                )}
                <div className="comment like">
                  <FaRegComment className="iconC" />
                  <p>Comment</p>
                </div>
              </div>
            </div>
          );
        })}
      {/* {isLoading && <Skeleton count={2} highlightColor="black" />} */}
      <h3 style={{ marginTop: "50px", fontWeight: "500" }}>No more posts</h3>
    </>
  );
};

export default Post;
