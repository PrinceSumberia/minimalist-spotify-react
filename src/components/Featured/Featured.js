import React from "react";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./FeaturedStyles.scss";

function Featured() {
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  return <h1>Featured</h1>;
}

export default Featured;
