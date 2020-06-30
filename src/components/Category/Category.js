import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./CategoryStyles.scss";
import { CATEGORIES_URL } from "../../constants/constants";

function Category({ location, match }) {
  const { accessToken } = useContext(DataContext);
  const id = match.params.id;
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const url = `${CATEGORIES_URL}/${id}/playlists`;

  const [data] = useFetchData("", url, headers);

  let lists;
  try {
    lists = data.data.playlists.items.map((list) => (
      <div className="category__list" key={list.id}>
        <Cards
          key={list.id}
          id={list.id}
          title={list.name}
          name={list.name}
          img={list.images[0].url}
          subtitle={`Total Tracks: ${list.tracks.total}`}
        />
      </div>
    ));
  } catch (err) {}
  return (
    <div className="category">
      <h2 className="category__header">{location.state.name}</h2>
      <div className="category__content">{lists}</div>;
    </div>
  );
}

export default Category;
