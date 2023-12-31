import React, { useEffect, useState } from "react";
import "./RightHomebar.css";
import ProfilePic from "../../Asset/profillePic.jpg";
import { IoSearch } from "react-icons/io5";
import axios from "axios";
import { useSelector } from "react-redux";

const RightHomebar = () => {
  const [findFriends, setFindFriends] = useState([]);
  const [friendRequest, setFriendRequest] = useState([]);

  const user = useSelector((state) => state.user.user);
  console.log(user);
  const fetchFindFriend = async () => {
    const data = await axios.get(`/api/friendRequest/findFriend?id=${user.id}`);
    console.log(data);
    setFindFriends(data.data.data);
  };

  useEffect(() => {
    fetchFindFriend();
    getAllFriendRequest();
  }, []);

  const sendFriendRequest = async (userId) => {
    const data = await axios.post(`/api/friendRequest`, {
      senderUserId: user.id,
      receiverUserId: userId,
      status: "pending",
    });
    fetchFindFriend()
    console.log(data);
  };

  const getAllFriendRequest = async () => {
    const data = await axios.get(`/api/friendRequest?id=${user.id}`);
    console.log(data);
    setFriendRequest(data.data.data);
  };

  const acceptFriendRequest = async (friendRequestId) => {
    const data = await axios.put(`/api/friendRequest`, {
      reqId: friendRequestId,
      status: "accepted",
    })
    getAllFriendRequest()
    console.log(data);
  };

  const declineFriendRequest = async (deleteRequestId) => {
    console.log(deleteRequestId)
    const data = await axios.delete(`/api/friendRequest/${deleteRequestId}`)
    getAllFriendRequest()
    console.log(data)
  };

  return (
    <div className="RightCotainer">
      <div className="frindReq">
        <div className="heding">
          <p className="request">Friend Request</p>
          <p className="see">See All</p>
        </div>
        {friendRequest.length == 0 && <h3>No friend request</h3>}
        {friendRequest.map((request) => {
          return (
            <div className="req">
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

        {/* <div className="req">
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
        </div> */}
      </div>
      <div className="findFriend">
        <div className="head">
          <p className="find">Find Friend</p>
          <IoSearch className="searchFrend" />
        </div>
        {findFriends.map((friend) => {
          return (
            <div className="friendInfo">
              <div className="profileFrd">
                <img src={ProfilePic} />
                <p className="userName">{friend.name}</p>
              </div>
              <div className="btns">
                <button
                  className="addFrnd"
                  onClick={() => {
                    sendFriendRequest(friend._id);
                  }}
                >
                  Add Friend
                </button>
                <button className="cancel">Cancel</button>
              </div>
            </div>
          );
        })}

        {/* <div className="friendInfo">
          <div className="profileFrd">
            <img src={ProfilePic} />
            <p className="userName">Tom & Jerry</p>
          </div>
          <div className="btns">
            <button className="addFrnd">Add Friend</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>

        <div className="friendInfo">
          <div className="profileFrd">
            <img src={ProfilePic} />
            <p className="userName">Tom & Jerry</p>
          </div>
          <div className="btns">
            <button className="addFrnd">Add Friend</button>
            <button className="cancel">Cancel</button>
          </div>
        </div>

        <div className="friendInfo">
          <div className="profileFrd">
            <img src={ProfilePic} />
            <p className="userName">Tom & Jerry</p>
          </div>
          <div className="btns">
            <button className="addFrnd">Add Friend</button>
            <button className="cancel">Cancel</button>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default RightHomebar;
