import React from "react";
import "./LeftHomebar.css";
import friends from "../../Asset/friends.png";
import group from "../../Asset/group.png";
import memories from "../../Asset/memories.png";
import save from "../../Asset/save.png";
import market from "../../Asset/market.png";
import event from "../../Asset/events.png";
import feed from "../../Asset/feed.png";
import ads from "../../Asset/graph.png";
import messenger from "../../Asset/download.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const LeftHomebar = () => {
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  return (
    <div className="left">
      <Link
        to={`/profile/${user.id}`}
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className="user info">
          <img
            className="leftImg"
            alt="user Image"
            src={
              user?.profilePicture ? user.profilePicture : "./defaultUser.jpg"
            }
          />
          <p>{user.name}</p>
        </div>
      </Link>
      <div className="friends info ">
        <img src={friends} className="friendIcon" />
        <p>Friends </p>
      </div>
      <div className="group info">
        <img src={group} />
        <p>Groups</p>
      </div>
      <div className="memories info">
        <img src={memories} className="memory" />
        <p>Memories</p>
      </div>
      <div className="save info">
        <img src={save} className="saved" />
        <p>Saved</p>
      </div>
      <div className="marketplace info">
        <img src={market} className="market" />
        <p>Marketplace</p>
      </div>
      <div className="feed info">
        <img src={feed} />
        <p>Feeds</p>
      </div>
      <div className="messanger">
        <img src={messenger} />
        <p>Messenger</p>
      </div>
      <div className="event info">
        <img src={event} />
        <p>Events</p>
      </div>
      <div className="ads info">
        <img src={ads} className="adss" />
        <p>Ads Manager</p>
      </div>
    </div>
  );
};

export default LeftHomebar;
