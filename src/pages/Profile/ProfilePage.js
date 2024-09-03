import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import backgroundImg from "../../Asset/backgroundProfile.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiCamera } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "../../Redux/User/userTypes";

const ProfilePage = () => {
  const { id } = useParams();
  const { user } = useSelector((state) => state.user);
  const [profileInfo, setProfileInfo] = useState(null);
  const dispatch = useDispatch();

  const [image, setImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, [id]);

  const getUserInfo = async () => {
    try {
      const { data } = await axios.get(
        `https://social-app-vt3a.onrender.com/api/user/userInfo/${id}`,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProfileInfo(data);
    } catch (error) {
      console.error("Error fetching user info:", error.response || error);
      if (error.response && error.response.status === 401) {
        alert("Unauthorized access. Please log in again.");
        // Handle logout or redirect to login page here
      }
    }
  };

  const handleImgUpload = async (img) => {
    try {
      const { data } = await axios.put(
        `https://social-app-vt3a.onrender.com/api/user/${id}`,
        {
          profilePicture: img,
        },
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const temp = {
        name: user.name,
        email: user.email,
        token: user.token,
        id: user.id,
        profilePicture: img,
      };
      localStorage.setItem("user", JSON.stringify(temp));
      dispatch({ type: LOGIN, payload: temp });
      getUserInfo();
    } catch (error) {
      console.error(
        "Error uploading profile picture:",
        error.response || error
      );
      if (error.response && error.response.status === 401) {
        alert("Unauthorized access. Please log in again.");
        // Handle logout or redirect to login page here
      }
    }
  };

  return (
    <>
      {!profileInfo && (
        <h1
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Loading...
        </h1>
      )}
      {profileInfo && (
        <div className="MainContainer">
          <div className="profileContainer">
            <div className="background">
              <img src={backgroundImg} className="backgroundImg" />
            </div>
            <div className="profile">
              {/* <div className="edit"> */}
              {profileInfo.user.profilePicture ? (
                <img
                  className="ProfilePageImage"
                  alt="profile Image"
                  src={profileInfo.user.profilePicture}
                />
              ) : (
                <img
                  className="defaultImage"
                  alt="profile picture"
                  src="../defaultUser.jpg"
                />
              )}

              <label htmlFor="changeProfileImg" style={{ cursor: "pointer" }}>
                <div className="editCamera">
                  <HiCamera />
                </div>
                <input
                  type="file"
                  name="changeProfileImg"
                  id="changeProfileImg"
                  onChange={(e) => {
                    handleImgUpload(e);
                  }}
                  hidden
                />
              </label>
              <p className="user-name">{profileInfo.user.name}</p>
              <p className="totalFriends">
                Total Friends: {profileInfo.friends.length}{" "}
              </p>
            </div>
            <div className="userInfo">
              <h3 className="heading">User Information</h3>
              <div className="info">
                <p>
                  <span>City : </span> {profileInfo.user.city}
                </p>
                <p>
                  <span>DOB :</span> {profileInfo.user.dateofBirth}
                </p>
                <p>
                  <span>Contact :</span> {profileInfo.user.contact}
                </p>
              </div>
            </div>
            <div className="btn">
              <button className="friend">Friend</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
