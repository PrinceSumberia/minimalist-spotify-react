import React, { useContext, useEffect } from "react";
import { DataContext, TopPlayListContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";

function TopChart() {
  const { accessToken } = useContext(DataContext);
  const { topPlayList, setTopPlayList } = useContext(TopPlayListContext);

  let url = `https://api.spotify.com/v1/browse/featured-playlists/`;

  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    if (data.success) {
      const { items } = data.data.playlists;
      setTopPlayList(items);
    }
  }, [data, setTopPlayList]);

  console.log(topPlayList);
  const lists = topPlayList.map((list) => (
    <Cards key={list.id} title={list.name} img={list.images[0].url} />
  ));

  return <div>{lists}</div>;
}

export default TopChart;
