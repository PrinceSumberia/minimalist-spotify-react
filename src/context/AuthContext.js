import React, { createContext, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

export const AuthContext = createContext();
export const AccessTokenContext = createContext();

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useLocalStorageState(
    "accessToken",
    null
  );

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
        {props.children}
      </AccessTokenContext.Provider>
    </AuthContext.Provider>
  );
};
