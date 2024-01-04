import React, { useEffect, useState } from "react";
import "./RightHomebar.css";
import ProfilePic from "../../Asset/profillePic.jpg";
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
      `/api/friendRequest/findFriend?id=${user.id}`,
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
    const data = await axios.get(`/api/post?id=${user.id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(data.data);
    dispatch({ type: FETCH_POSTS, payload: data.data });
    getAllFriendRequest();
  };

  const sendFriendRequest = async (friend) => {
    const data = await axios.post(`/api/friendRequest`, {
      senderUserId: user.id,
      receiverUserId: friend._id,
      status: "pending",
    }, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    toast(`Friend reaquest sent to ${friend.name}`);
    fetchFindFriend();
    getAllFriendRequest();
    getAllPost();
  };

  const getAllFriendRequest = async () => {
    const data = await axios.get(`/api/friendRequest?id=${user.id}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    // console.log(data);
    setFriendRequest(data.data.data);
  };

  const acceptFriendRequest = async (friendRequestId) => {
    const data = await axios.put(
      `/api/friendRequest`,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      },
      {
        reqId: friendRequestId,
        status: "accepted",
      }
    );
    getAllPost();
  };

  const declineFriendRequest = async (deleteRequestId) => {
    console.log(deleteRequestId);
    const data = await axios.delete(`/api/friendRequest/${deleteRequestId}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    console.log(data);
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
                  <img src={ProfilePic} />
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
          return (
            <div className="friendInfo" key={friend._id}>
              <div className="profileFrd">
                <img src={ProfilePic} />
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
      {/* Same as */}
      <ToastContainer />
      {/* <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      /> */}
    </div>
  );
};

export default RightHomebar;
