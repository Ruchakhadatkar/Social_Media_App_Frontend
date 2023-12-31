import React, { useEffect, useState } from "react";
import "./ProfilePage.css";
import backgroundImg from "../../Asset/backgroundProfile.jpg";
import ProfileImg from "../../Asset/profillePic.jpg";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BsTypeH1 } from "react-icons/bs";

const ProfilePage = () => {
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState(null);
  if (profileInfo) {
    const { friends, post, user } = profileInfo;
  }
  const [image, setImage] = useState(null);
  const [isImageUploading, setIsImageUploading] = useState(false);

  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = async () => {
    const data = await axios.get(`/api/user/userInfo/${id}`);
    console.log(data);
    setProfileInfo(data.data);
  };
  const handleImgUpload = async (e) => {
    // setIsImageUploading(true)
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
  };

  const uploadProfilePicture = async () => {
    const data = await axios.put(`/api/user/${id}`, {
      profilePicture: image,
    });
    console.log(data);
  };
  return (
    <>
      {!profileInfo ? <h1>Loading...</h1> : <></>}
      {profileInfo && (
        <div className="MainContainer">
          <div className="profileContainer">
            <div className="background">
              <img src={backgroundImg} className="backgroundImg" />
            </div>
            <div className="profile">
              <img src={ProfileImg} className="ProfileImage" />
              <p>user Name</p>
              <p className="totalFriends">Total Friends: </p>
            </div>
            <div className="userInfo">
              <h3 className="heading">User Information</h3>
              <div className="info">
                <p>
                  <span>City :</span> aaaaaa
                </p>
                <p>
                  <span>DOB :</span> 00/00/00
                </p>
                <p>
                  <span>Contact :</span>
                  000000
                </p>
              </div>
            </div>
            <div className="btn">
              <button className="friend">Friend</button>
              <label htmlFor="changeProfileImg">
                <button className="change">Change Profile</button>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProfilePage;
