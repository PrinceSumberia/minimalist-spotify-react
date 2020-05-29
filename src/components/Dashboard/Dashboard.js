import React, { useEffect, useContext } from "react";
import useLocalStorageState from "../../hooks/useLocalStorageState";
import axios from "axios";
import "./DashBoardStyles.scss";
import { DataContext } from "../../context/DataContext";
import Profile from "../Profile/Profile";

export default function Dashboard() {
  const [accessToken] = useLocalStorageState("accessToken", null);
  const { setProfileData } = useContext(DataContext);

  useEffect(() => {
    const getData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return response;
    };
    getData().then((response) => {
      if (response.status === 200) {
        setProfileData(response.data);
      }
    });
  }, [accessToken, setProfileData]);

  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="mainContent">
        <Profile />
      </div>
    </div>
  );
}

// useEffect(() => {
//   setAccessToken(hash.access_token);
//   const getData = async () => {
//     const response = await axios.get("https://api.spotify.com/v1/me", {
//       headers: {
//         Authorization: "Bearer " + accessToken,
//       },
//     });
//     return response;
//   };
//   getData().then((result) => {
//     if (result.status === 200) {
//       console.log(result.data);
//       setIsAuthenticated(true);
//       history.push("/dashboard");
//     } else {
//       console.log("error occured");
//     }
//   });
//   // if (accessToken) {
//   //   console.log(accessToken);
//   //   setIsAuthenticated(true);
//   //   history.push("/dashboard");
//   // }
//   // setAccessToken(getData().then((data) => console.log(data)));
// });
