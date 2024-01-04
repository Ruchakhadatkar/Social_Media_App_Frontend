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
    const data = await axios.get(`/api/user/userInfo/${id}`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },);
    console.log(data);
    setProfileInfo(data.data);
  };

  const handleImgUpload = async (e) => {
    setIsImageUploading(true);
    console.log("Working", isImageUploading);
    if (isImageUploading == true) {
      return window.alert("Image is uploading");
    }
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "socialMedia");
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/ditqh6dqi/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );
    const data = await response.json();
    console.log(data);
    setImage(data.secure_url);
    setIsImageUploading(false);
    const uploaddp = await uploadProfilePicture(data.secure_url);
  };

  const uploadProfilePicture = async (img) => {
    const data = await axios.put(`/api/user/${id}`, {
      profilePicture: img,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },);
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
  };

  return (
    <>
      {!profileInfo && <h1>Loading...</h1>}
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
                <img className="defaultImage" alt="profile picture" src="../defaultUser.jpg" />
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
              {/* </div> */}
              <p>{profileInfo.user.name}</p>
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
