import React, { useEffect, useContext } from "react";
import axios from "axios";
import { DataContext } from "../../context/DataContext";
import Profile from "../Profile/Profile";
import "./DashBoardStyles.scss";
import { AccessTokenContext } from "../../context/AuthContext";

export default function Dashboard() {
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  const { setProfileData } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios
        .get("https://api.spotify.com/v1/me", {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
        .catch((error) => {
          if (error.response.status === 401) {
            setAccessToken(null);
          }
        });
      if (response.status === 200) {
        setProfileData(response.data);
      } else {
        console.log("error occured");
      }
    };
    getData();
  }, [accessToken, setProfileData, setAccessToken]);

  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="mainContent">
        <Profile />
      </div>
    </div>
  );
}
