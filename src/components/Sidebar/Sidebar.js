import React from "react";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Player from "../Player/Player";

function Sidebar() {
  return (
    <>
      <Profile />
      <Navbar />
      <div className="sidebar__player">
        <Player />
      </div>
    </>
  );
}

export default Sidebar;
