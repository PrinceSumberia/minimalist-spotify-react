import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export default function Profile() {
  const { profileData } = useContext(DataContext);
  const { display_name } = { ...profileData.data };

  return (
    <div className="">
      <h4 className="">{display_name}</h4>
    </div>
  );
}
