import React, { useContext, useEffect } from "react";
import { DataContext, TopPlayListContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./TopChartStyles.scss";
import { ChevronRight, ChevronLeft } from "react-feather";

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

  const handleScroll = () => {};

  console.log(topPlayList);
  const lists = topPlayList.map((list) => (
    <Cards key={list.id} title={list.name} img={list.images[0].url} />
  ));

  return (
    <div className="">
      <ChevronLeft onClick={handleScroll} />
      <ChevronRight />
      <div className="charts-container">{lists}</div>
    </div>
  );
}

export default TopChart;
