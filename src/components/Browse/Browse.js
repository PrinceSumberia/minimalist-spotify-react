import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import useFetchData from "../../hooks/useFetchData";
import { RECOMMENDATION_URL } from "../../constants/constants";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import "./BrowseStyles.scss";

function Browse() {
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  // const [data] = useFetchData("", RECOMMENDATION_URL, headers);
  // const [data] = useFetchData(
  //   "",
  //   "https://api.spotify.com/v1/recommendations/available-genre-seeds",
  //   headers
  // );
  // console.log(data);
  // // console.log(data);
  // // console.log(data2);
  const [data] = useFetchData(
    "",
    "https://api.spotify.com/v1/browse/categories",
    headers
  );
  const [data2] = useFetchData(
    "",
    "https://api.spotify.com/v1/browse/categories/toplists/playlists",
    headers
  );
  console.log(data2);
  let result;
  try {
    result = data.data.categories.items.map((item) => (
      <div className="browse__categories__container">
        <div key={item.id} className="browse__media">
          <img
            alt={item.id}
            src={item.icons[0].url}
            className="browse__media__img"
          />
        </div>
        <div className="content-overlay">
          <h2>{item.name}</h2>
        </div>
      </div>
    ));
  } catch (err) {}

  return (
    <div className="browse">
      <SearchForm />
      <div className="browse__container">
        <h2 className="browse__title">Categories</h2>
        <div className="browse__categories">{result}</div>
      </div>
    </div>
  );
}

export default Browse;
