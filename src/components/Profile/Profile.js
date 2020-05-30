import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { Settings, Bell } from "react-feather";
import "./ProfileStyles.scss";

export default function Profile() {
  const { profileData } = useContext(DataContext);
  const { display_name, images, email } = { ...profileData.data };
  let src;
  try {
    src = images[0].url;
  } catch (err) {}

  return (
    <div className="profile">
      <div className="media">
        <img src={src} alt="" className="media__img" />
      </div>
      <div className="user">
        <h4 className="user__name">{display_name}</h4>
        <p className="user_email">{email}</p>
      </div>
      <div className="controls">
        <div className="controls__notification">
          <Bell />
        </div>
        <div className="controls__settings">
          <Settings />
        </div>
      </div>
    </div>
  );
}
