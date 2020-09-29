import React, { useContext, useEffect, useRef, memo } from "react";
import { useHistory } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "react-feather";

import Cards from "../Cards/Cards";
import SearchForm from "../SearchForm/SearchForm";

import useFetchData from "../../hooks/useFetchData";
import {
  CurrentPlayListContext,
  DataContext,
  TopPlayListContext,
} from "../../context/DataContext";

import { TOP_PLAYLIST_URL } from "../../constants/constants";

import "./TopChartStyles.scss";

function TopChart() {
  const {
    accessToken,
    setIsAuthenticated,
    setAccessToken,
    sdkPlayer,
  } = useContext(DataContext);
  const { topPlayList, setTopPlayList } = useContext(TopPlayListContext);
  const scroller = useRef(null);
  const { setCurrentPlayListId, setCurrentPlayListType } = useContext(
    CurrentPlayListContext
  );

  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const [data] = useFetchData("", TOP_PLAYLIST_URL, headers);

  if (data.status === 401) {
    window.localStorage.removeItem("accessToken");
    sdkPlayer.disconnect();
    setIsAuthenticated(false);
    setAccessToken(null);
  }

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

  const history = useHistory();

  const getID = (id, name) => {
    setCurrentPlayListId(id);
    setCurrentPlayListType({ name: name, type: "playlists" });
  };

  const handleSubmit = (query) => {
    history.push({
      pathname: "/search",
      state: {
        query,
      },
    });
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
        <div className="topchart-search">
          <SearchForm handleSubmit={handleSubmit} />
        </div>
        <h3 className="topchart-heading">Billboard Topchart</h3>
      </div>
      <div ref={scroller} className="charts-container">
        {lists}
      </div>
    </div>
  );
}

export default memo(TopChart);
