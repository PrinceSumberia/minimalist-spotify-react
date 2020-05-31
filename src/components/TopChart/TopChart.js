import React, { useContext, useEffect, useRef } from "react";
import { DataContext, TopPlayListContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./TopChartStyles.scss";
import { ChevronRight, ChevronLeft } from "react-feather";

function TopChart() {
  const { accessToken } = useContext(DataContext);
  const { topPlayList, setTopPlayList } = useContext(TopPlayListContext);
  const scroller = useRef(null);

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

  const handleScroll = (e) => {
    e.preventDefault();
    if (e.target.id === "scrollLeft") {
      let pos = scroller.current.scrollLeft;
      pos -= 1000;
      scroller.current.scroll({ left: pos, behavior: "smooth" });
    } else if (e.target.id === "scrollRight") {
      let pos = scroller.current.scrollLeft;
      pos += 1000;
      scroller.current.scroll({ left: pos, behavior: "smooth" });
    }
  };

  console.log(topPlayList);
  const lists = topPlayList.map((list) => (
    <Cards key={list.id} title={list.name} img={list.images[0].url} />
  ));

  return (
    <div className="topChart-container">
      <div className="scrollers" onClick={handleScroll}>
        <ChevronLeft className="icons" id="scrollLeft" />
        <ChevronRight className="icons" id="scrollRight" />
      </div>
      <div ref={scroller} className="charts-container">
        {lists}
      </div>
    </div>
  );
}

export default TopChart;
