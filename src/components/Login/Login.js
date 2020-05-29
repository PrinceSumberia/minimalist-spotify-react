import React, { useEffect, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AUTH_URL } from "../../constants/constants";
import { AuthContext, AccessTokenContext } from "../../context/AuthContext";

const getHash = () => {
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
  return hash;
};

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);
  let history = useHistory();

  useEffect(() => {
    const { access_token } = getHash();
    if (access_token) {
      setAccessToken(access_token);
      setIsAuthenticated(true);
    }
  }, [setIsAuthenticated, setAccessToken]);

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/dashboard");
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
