import React, { useContext, useEffect, useState } from "react";
import { FEATURED_PLAYLIST_URL } from "../../constants/constants";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import Loader from "../Loader/Loader";
import "./FeaturedStyles.scss";

function Featured() {
  const { accessToken } = useContext(DataContext);
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", FEATURED_PLAYLIST_URL, headers);

  useEffect(() => {
    if (data.success) {
      setLoading(false);
      const { items } = data.data.playlists;
      setList(items);
    }
  }, [data]);

  const lists = list.map((list) => (
    <div className="featured__item" key={list.id}>
      <Cards
        id={list.id}
        title={list.name}
        name={list.name}
        img={list.images[0].url}
        subtitle={`Total Tracks: ${list.tracks.total}`}
      />
    </div>
  ));

  return loading ? (
    <Loader />
  ) : (
    <div className="featured__container">{lists}</div>
  );
}

export default Featured;
