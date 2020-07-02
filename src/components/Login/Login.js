import React, { memo, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AUTH_URL } from "../../constants/constants";
import { AccessTokenContext, AuthContext } from "../../context/AuthContext";
import "./LoginStyles.scss";
import { getHash } from "../../utils/helpers";

function Login() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { accessToken, setAccessToken } = useContext(AccessTokenContext);

  let history = useHistory();

  useEffect(() => {
    if (isAuthenticated) {
      history.push("/");
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
