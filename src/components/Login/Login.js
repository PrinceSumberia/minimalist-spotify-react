import React, { useEffect, useState, useContext } from "react";
import { AUTH_URL } from "../../constants/constants";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const { access_token } = hash;
    if (access_token !== null && access_token !== undefined) {
      console.log(access_token);
      setAccessToken(access_token);
      setIsAuthenticated(true);
    }
  });

  return (
    <div className="Login">
      <h4 className="heading">Please Login With your Spotify Account.</h4>
      <a href={AUTH_URL}>Login with Spotify</a>
      <div className="">
        <Link to="/dashboard">dashboard</Link>
      </div>
    </div>
  );
}

export default Login;
