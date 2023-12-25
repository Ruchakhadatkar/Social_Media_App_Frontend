import React, { useState } from "react";
import "./WhatsonyourMind.css";
import { IoVideocamSharp } from "react-icons/io5";
import { MdOutlinePhotoLibrary } from "react-icons/md";
import { GoSmiley } from "react-icons/go";
import { MdOutlineClose } from "react-icons/md";
import profilePic from "../../Asset/profillePic.jpg";
import Post from "../Post/Post";
import { Image, Transformation } from "cloudinary-react";

const WhatsonyourMind = () => {
  const [image, setImage] = useState(null);

  const handleImgUpload = async (e) => {
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
  };

  return (
    <div className="mainContainer">
      <div className="middleUpper">
        <div className="upper">
          <img src={profilePic} />
          <input type="text" placeholder="What's on your mind, userName ?" />
        </div>
        <hr />
        <div className="PostIcon">
          <div className=" activity">
            <IoVideocamSharp className="videoLive icon" />
            <p>Live video</p>
          </div>
          <div className=" activity">
            <MdOutlinePhotoLibrary className="photos icon" />
            <p>Photo/Video</p>
          </div>
          <div className=" activity">
            <GoSmiley className="smiley icon" />
            <p>Feeling/Activity</p>
          </div>
        </div>

        {image && (
          <div>
            <Image publicId={image}>
              <Transformation width="300" height="200" crop="fill" />
            </Image>
          </div>
        )}
        <button>Post</button>
        <input type="file" onChange={handleImgUpload} />
      </div>
      <div className="postContainer"></div>
      <Post />
    </div>
  );
};

export default WhatsonyourMind;
