import React from "react";
import "./DashBoardStyles.scss";

export default function Dashboard() {
  return (
    <div className="container">
      <div className="sidebar"></div>
      <div className="mainContent"></div>
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
