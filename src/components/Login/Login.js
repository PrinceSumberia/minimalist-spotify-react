import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AUTH_URL } from "../../constants/constants";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [accessToken, setAccessToken] = useState(null);
  let history = useHistory();

  useEffect(() => {
    setAccessToken(hash.access_token);
    const getData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      return response;
    };
    getData().then((result) => {
      if (result.status === 200) {
        console.log(result.data);
        setIsAuthenticated(true);
        // history.push("/dashboard");
      } else {
        console.log("error occured");
      }
    });
    // if (accessToken) {
    //   console.log(accessToken);
    //   setIsAuthenticated(true);
    //   history.push("/dashboard");
    // }
    // setAccessToken(getData().then((data) => console.log(data)));
  }, [accessToken]);

  return (
    <div className="Login">
      <h4 className="heading">Please Login With your Spotify Account.</h4>
      <a href={AUTH_URL}>Login with Spotify</a>>
    </div>
  );
}

export default Login;
