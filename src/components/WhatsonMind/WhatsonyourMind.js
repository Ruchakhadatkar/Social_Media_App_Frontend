import React, { useEffect, useState } from "react";
import "./WhatsonyourMind.css";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import Post from "../Post/Post";
import { Image, Transformation } from "cloudinary-react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FETCH_POSTS } from "../../Redux/Posts/postsTypes";

const WhatsonyourMind = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [isImageUploading, setIsImageUploading] = useState(false);

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
  };

  const userPost = async () => {
    if (isImageUploading) {
      return toast("Image Uploading...");
    }
    const data = await axios.post(`/api/post`, {
      caption: caption,
      image: image,
      userId: user.id,
    },
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },);
    setCaption("");
    getAllPost();
  };

  const getAllPost = async () => {
    const data = await axios.get(`/api/post?id=${user.id}&limit=5&skip=0`,
    {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    },);
    // console.log(data.data);
    dispatch({ type: FETCH_POSTS, payload: data.data });
  };

  return (
    <>
      <div className="mainContainer">
        <div className="middleUpper">
          <div className="upper">
            <img
            className="ImgContainer"
              alt="user Image"
              src={
                user?.profilePicture ? user.profilePicture : "./defaultUser.jpg"
              }
            />
            <input
              type="text"
              value={caption}
              placeholder="What's on your mind, userName ?"
              onChange={(e) => {
                setCaption(e.target.value);
              }}
            />
          </div>
          <hr />
          <div className="PostIcon">
            <div className=" activity">
              <IoVideocamSharp className="videoLive icon" />
              <p>Video</p>
            </div>
            <label htmlFor="photoPicker">
              <div className=" activity">
                <MdOutlinePhotoLibrary className="photos icon" />
                <p>Photo</p>
              </div>
              <input
                type="file"
                name="photoPicker"
                id="photoPicker"
                onChange={(e) => {
                  handleImgUpload(e);
                }}
                hidden
              />
            </label>
            <div className=" activity">
              <GoSmiley className="smiley icon" />
              <p>Feeling/Activity</p>
            </div>
          </div>
          {image && (
            <div>
              <Image publicId={image} className="preview">
                <Transformation crop="fill" />
              </Image>
            </div>
          )}
          <button onClick={userPost}>Post</button>
        </div>
        <div className="postContainer"></div>
        <Post />

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
    </>
  );
};

export default WhatsonyourMind;
