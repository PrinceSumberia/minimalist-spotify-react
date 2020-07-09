import React, { memo } from "react";
import Profile from "../Profile/Profile";
import Navbar from "../Navbar/Navbar";
import Player from "../Player/Player";
import "./SidebarStyle.scss";

function Sidebar() {
  return (
    <>
      <Profile />
      <Navbar />
      <Player />
    </>
  );
}

export default memo(Sidebar);
