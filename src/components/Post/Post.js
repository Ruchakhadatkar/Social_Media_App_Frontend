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
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Timestamp from "react-timestamp";

const Post = () => {
  const { user } = useSelector((state) => state.user);
  const { posts } = useSelector((state) => state.posts);
  const [pageNo, setPageNo] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    getAllPost();
  }, [pageNo, user]);
  console.log(user);

  const getAllPost = async () => {
    setIsLoading(true);
    const data = await axios.get(
      `/api/post?id=${user.id}&limit=5&skip=${pageNo * 5}`
    );
    // setPosts(data.data);
    dispatch({ type: FETCH_POSTS, payload: [...posts, ...data.data] });
    setIsLoading(false);
  };

  const likePost = async (postId) => {
    const data = await axios.post(`/api/likes`, {
      userId: user.id,
      postId: postId,
    });
    getAllPost();
  };

  const disLikePost = async (postId) => {
    const data = await axios.delete(
      `/api/likes?userId=${user.id}&postId=${postId}`
    );
    getAllPost();
  };

  const checkedLikePost = (likedUsers) => {
    const isLiked = likedUsers.some((item) => item.userId._id == user.id);
    return isLiked;
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight + 1 >= scrollHeight) {
      setPageNo((prev) => prev + 1);
    }
  };

  const debouncedHandleScroll = _debounce(handleScroll, 200);
  useEffect(() => {
    window.addEventListener("scroll", debouncedHandleScroll);
    return () => {
      window.removeEventListener("scroll", debouncedHandleScroll);
    };
  }, []);

  return (
    <>
      {posts.map((post, i) => {
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
                  <p>Dislike</p>
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
      {isLoading && <Skeleton count={2} highlightColor="black" />}
      <h3 style={{ marginTop: "50px", fontWeight:"500" }}>No more posts</h3>
    </>
  );
};

export default Post;
