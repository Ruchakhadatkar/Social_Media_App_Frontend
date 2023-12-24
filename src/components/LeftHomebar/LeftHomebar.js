import React from "react";
import "./LeftHomebar.css";
import profilePic from "../../Asset/profillePic.jpg";
import friends from "../../Asset/friends.png";
import group from "../../Asset/group.png";
import memories from "../../Asset/memories.png";
import save from "../../Asset/save.png";
import market from "../../Asset/market.png";
import event from "../../Asset/events.png";
import feed from "../../Asset/feed.png";
import ads from "../../Asset/graph.png";
import messenger from "../../Asset/download.jpg";

const LeftHomebar = () => {
  return (
    <div className="left">
      <div className="user info">
        <img src={profilePic} />
        <p>User Name</p>
      </div>
      <div className="friends info ">
        <img src={friends} />
        <p>Friends </p>
      </div>
      <div className="group info">
        <img src={group} />
        <p>Groups</p>
      </div>
      <div className="memories info">
        <img src={memories} />
        <p>Memories</p>
      </div>
      <div className="save info">
        <img src={save} />
        <p>Saved</p>
      </div>
      <div className="marketplace info">
        <img src={market} />
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
        <img src={ads} />
        <p>Ads Manager</p>
      </div>
    </div>
  );
};

export default LeftHomebar;