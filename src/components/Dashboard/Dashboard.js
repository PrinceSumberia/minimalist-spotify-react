import React, { useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import Profile from "../Profile/Profile";
import "./DashBoardStyles.scss";
import useFetchData from "../../hooks/useFetchData";

export default function Dashboard() {
  const { setProfileData, accessToken } = useContext(DataContext);

  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    setProfileData(data);
  }, [data, setProfileData]);

  console.log(data);

  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="mainContent">
        <Profile />
      </div>
    </div>
  );
}
