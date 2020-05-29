import React, { createContext, useState } from "react";

export const DataContext = createContext();

export const DataProvider = (props) => {
  const [profileData, setProfileData] = useState("");

  return (
    <DataContext.Provider value={{ profileData, setProfileData }}>
      {props.children}
    </DataContext.Provider>
  );
};
