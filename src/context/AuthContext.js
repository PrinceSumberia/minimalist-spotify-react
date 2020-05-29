import React, { createContext, useState } from "react";

export const AuthContext = createContext();
export const AccessTokenContext = createContext();

export const AuthProvider = (props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <AccessTokenContext.Provider value={{ accessToken, setAccessToken }}>
        {props.children}
      </AccessTokenContext.Provider>
    </AuthContext.Provider>
  );
};
