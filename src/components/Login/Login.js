import React, { useEffect, useContext, memo } from "react";
import { useHistory } from "react-router-dom";
import { AUTH_URL } from "../../constants/constants";
import { AuthContext, AccessTokenContext } from "../../context/AuthContext";
import "./LoginStyles.scss";

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
    if (isAuthenticated) {
      history.push("/dashboard");
    }
  });

  useEffect(() => {
    const { access_token } = getHash();
    if (accessToken) {
      setIsAuthenticated(true);
    } else if (access_token) {
      setAccessToken(access_token);
      setIsAuthenticated(true);
    }
  }, [accessToken, setAccessToken, setIsAuthenticated]);

  return (
    <div className="login">
      <h4 className="login__heading">
        Please login with your Spotify account.
      </h4>
      <a className="login__btn" href={AUTH_URL}>
        Login with Spotify
      </a>
    </div>
  );
}

export default memo(Login);
