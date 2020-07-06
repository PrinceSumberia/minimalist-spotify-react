import React, { memo, useContext } from "react";
import { LogOut } from "react-feather";
import { DataContext } from "../../context/DataContext";
import "./ProfileStyles.scss";

function Profile() {
  const {
    profileData,
    setIsAuthenticated,
    setAccessToken,
    sdkPlayer,
  } = useContext(DataContext);
  const { display_name, images, email } = { ...profileData.data };
  let src;
  try {
    src = images[0].url;
  } catch (err) {}

  const logout = () => {
    window.localStorage.removeItem("accessToken");
    sdkPlayer.disconnect();
    setIsAuthenticated(false);
    setAccessToken(null);
  };

  return (
    <div className="profile">
      <div className="media">
        <img src={src} alt="user" className="media__img" />
      </div>
      <div className="user">
        <h4 className="user__name">
          Hi, <span>{display_name}</span>
        </h4>
        <p className="user__email">{email}</p>
      </div>
      <div className="controls">
        <div className="controls__notification" onClick={logout}>
          <LogOut />
        </div>
      </div>
    </div>
  );
}

export default memo(Profile);
