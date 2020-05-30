import React, { useEffect, useContext } from "react";
import Profile from "../Profile/Profile";
import useFetchData from "../../hooks/useFetchData";
import { DataContext } from "../../context/DataContext";
import "./DashBoardStyles.scss";

export default function Dashboard() {
  const { setProfileData, accessToken, setAccessToken } = useContext(
    DataContext
  );

  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    console.log(data);
    if (data.success) {
      setProfileData(data);
    } else if (data.status === 401) {
      setAccessToken(null);
    }
  }, [data, setProfileData, setAccessToken]);

  return (
    <div className="container">
      <div className="sidebar">
        <Profile />
      </div>
      <div className="mainContent"></div>
    </div>
  );
}
