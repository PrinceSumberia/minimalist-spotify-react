import React, { useContext } from "react";
import { Bell, Settings, LogOut } from "react-feather";
import { DataContext } from "../../context/DataContext";
import "./ProfileStyles.scss";

export default function Profile() {
  const { profileData } = useContext(DataContext);
  const { display_name, images, email } = { ...profileData.data };
  let src;
  try {
    src = images[0].url;
  } catch (err) {
    console.log(err);
  }

  return (
    <div className="profile">
      <div className="media">
        <img src={src} alt="" className="media__img" />
      </div>
      <div className="user">
        <h4 className="user__name">
          Hi, <span>{display_name}</span>
        </h4>
        <p className="user_email">{email}</p>
      </div>
      <div className="controls">
        <div className="controls__notification">
          <LogOut />
          <Bell />
        </div>
        <div className="controls__settings">
          <Settings />
        </div>
      </div>
    </div>
  );
}
