import React, { useEffect, useContext } from "react";
import Profile from "../Profile/Profile";
import useFetchData from "../../hooks/useFetchData";
import { DataContext, TopPlayListProvider } from "../../context/DataContext";
import TopChart from "../TopChart/TopChart";
import "./DashBoardStyles.scss";

export default function Dashboard() {
  const {
    setProfileData,
    accessToken,
    setAccessToken,
    setIsAuthenticated,
  } = useContext(DataContext);

  const url = "https://api.spotify.com/v1/me";
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    if (data.success) {
      setProfileData(data);
    } else if (data.status === 401) {
      setIsAuthenticated(false);
      setAccessToken(null);
    }
  }, [data, setProfileData, setAccessToken, setIsAuthenticated]);

  return (
    <div className="container">
      <div className="sidebar">
        <Profile />
      </div>
      <div className="mainContent">
        <TopPlayListProvider>
          <TopChart />
        </TopPlayListProvider>
      </div>
    </div>
  );
}
