import React, { useContext, useEffect } from "react";
import useFetchData from "../../hooks/useFetchData";
import { TopPlayListContext, DataContext } from "../../context/DataContext";

function TopChart() {
  const { accessToken } = useContext(DataContext);
  const { topPlayList, setTopPlayList } = useContext(TopPlayListContext);

  let url = `https://api.spotify.com/v1/browse/featured-playlists`;

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
  const lists = topPlayList.map((list) => <h4 key={list.id}>{list.name}</h4>);

  return <div>{lists}</div>;
}

export default TopChart;
