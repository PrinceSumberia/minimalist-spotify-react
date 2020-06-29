import React, { useContext, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import {
  CurrentPlayListContext,
  DataContext,
  TopPlayListContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import SearchForm from "../SearchForm/SearchForm";
import "./TopChartStyles.scss";
import { memo } from "react";
import { TOP_PLAYLIST_URL } from "../../constants/constants";

function TopChart() {
  const { accessToken } = useContext(DataContext);
  const { topPlayList, setTopPlayList } = useContext(TopPlayListContext);
  const scroller = useRef(null);
  const { setCurrentPlayListId, setCurrentPlayListType } = useContext(
    CurrentPlayListContext
  );

  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [data] = useFetchData("", TOP_PLAYLIST_URL, headers);

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

  const getID = (id, name) => {
    setCurrentPlayListId(id);
    setCurrentPlayListType({ name: name, type: "playlists" });
  };

  const lists = topPlayList.map((list) => (
    <Cards
      key={list.id}
      id={list.id}
      title={list.name}
      name={list.name}
      img={list.images[0].url}
      subtitle={`Total Tracks: ${list.tracks.total}`}
      handleClick={getID}
    />
  ));

  return (
    <div className="topchart-container">
      <div className="topchart-header">
        <div className="scrollers" onClick={handleScroll}>
          <ChevronLeft className="icons" id="scrollLeft" />
          <ChevronRight className="icons" id="scrollRight" />
        </div>
        <SearchForm />
        <h3 className="topchart-heading">Billboard Topchart</h3>
      </div>
      <div ref={scroller} className="charts-container">
        {lists}
      </div>
    </div>
  );
}

export default memo(TopChart);
