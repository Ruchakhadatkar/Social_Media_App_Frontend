import React, { useEffect, useState } from "react";
import "./RightHomebar.css";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FETCH_POSTS } from "../../Redux/Posts/postsTypes";

const RightHomebar = () => {
  const [findFriends, setFindFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);

  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchFindFriend = async () => {
    const data = await axios.get(
      `https://social-app-vt3a.onrender.com/api/friendRequest/findFriend?id=${user.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setFindFriends(data.data.data);
  };

  useEffect(() => {
    fetchFindFriend();
    getAllFriendRequest();
  }, []);

  const getAllPost = async () => {
    const data = await axios.get(
      `https://social-app-vt3a.onrender.com/api/post?id=${user.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    dispatch({ type: FETCH_POSTS, payload: data.data });
    getAllFriendRequest();
  };

  const sendFriendRequest = async (friend) => {
    const data = await axios.post(
      `https://social-app-vt3a.onrender.com/api/friendRequest`,
      {
        senderUserId: user.id,
        receiverUserId: friend._id,
        status: "pending",
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    toast(`Friend reaquest sent to ${friend.name}`);
    fetchFindFriend();
    getAllFriendRequest();
    getAllPost();
  };

  const getAllFriendRequest = async () => {
    const data = await axios.get(
      `https://social-app-vt3a.onrender.com/api/friendRequest?id=${user.id}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    setFriendRequest(data.data.data);
  };

  const acceptFriendRequest = async (friendRequestId) => {
    const data = await axios.put(
      `https://social-app-vt3a.onrender.com/api/friendRequest`,
      {
        reqId: friendRequestId,
        status: "accepted",
      },
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    getAllPost();
  };

  const declineFriendRequest = async (deleteRequestId) => {
    const data = await axios.delete(
      `https://social-app-vt3a.onrender.com/api/friendRequest/${deleteRequestId}`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    getAllPost();
  };

  return (
    <div className="RightCotainer">
      <div className="frindReq">
        <div className="heding">
          <p className="request">Friend Request</p>
          <p className="see">See All</p>
        </div>
        {friendRequest.length == 0 && (
          <h3 style={{ fontWeight: "500" }}>No friend request</h3>
        )}
        {friendRequest.map((request) => {
          return (
            <div className="req" key={request._id}>
              <div className="userInfo">
                <div className="userreq">
                  {" "}
                  <img src={request.senderUserId.profilePicture} />
                  <div className="name">
                    <p className="user">{request.senderUserId.name}</p>
                    <p className="mutual">11 mutual friends</p>
                  </div>
                </div>
              </div>
              <div className="btns">
                <button
                  className="crnfm"
                  onClick={() => {
                    acceptFriendRequest(request._id);
                  }}
                >
                  Confirm
                </button>
                <button
                  className="delt"
                  onClick={() => {
                    declineFriendRequest(request._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="findFriend">
        <div className="head">
          <p className="find">Find Friend</p>
          <IoSearch className="searchFrend" />
        </div>
        {findFriends.map((friend) => {
          console.log(friend);
          return (
            <div className="friendInfo" key={friend._id}>
              <div className="profileFrd">
                <img src={friend.profilePicture} />
                <p className="userName">{friend.name}</p>
              </div>
              <div className="btns">
                <button
                  className="addFrnd"
                  onClick={() => {
                    sendFriendRequest(friend);
                  }}
                >
                  Add Friend
                </button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ToastContainer />
    </div>
  );
};

export default RightHomebar;
