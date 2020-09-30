import React, { useContext, useEffect, memo, useRef } from "react";
import { ChevronLeft, ChevronRight } from "react-feather";

import Cards from "../Cards/Cards";

import useFetchData from "../../hooks/useFetchData";
import {
  CurrentPlayListContext,
  DataContext,
  NewAlbumContext,
} from "../../context/DataContext";

import { NEWALBUMS_URL } from "../../constants/constants";

import "./NewAlbumsStyles.scss";

function NewAlbums() {
  const {
    accessToken,
    sdkPlayer,
    setIsAuthenticated,
    setAccessToken,
  } = useContext(DataContext);
  const { newAlbum, setNewAlbum } = useContext(NewAlbumContext);
  const { setCurrentPlayListId, setCurrentPlayListType } = useContext(
    CurrentPlayListContext
  );
  const newAlbum_scroller = useRef(null);

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData("", NEWALBUMS_URL, headers);

  if (data.status === 401) {
    window.localStorage.removeItem("accessToken");
    sdkPlayer.disconnect();
    setIsAuthenticated(false);
    setAccessToken(null);
  }

  useEffect(() => {
    let albumData = [];
    if (data.status === 200) {
      const filterData = data.data.albums.items.filter(
        (track) => track.album_type === "album"
      );
      albumData = filterData.map((alb, i) => {
        const index = alb.name.search(/\(/);
        return {
          name: (index !== -1 ? alb.name.slice(0, index) : alb.name)
            .trim()
            .toLowerCase(),
          uri: alb.uri,
          id: alb.id,
          thumbnail: alb.images[0],
          image: alb.images[1],
        };
      });
    }
    setNewAlbum(albumData);
  }, [setNewAlbum, data]);

  const getID = (id, name) => {
    setCurrentPlayListType({ name: name, type: "albums" });
    setCurrentPlayListId(id);
  };

  const handleScroll = (e) => {
    e.preventDefault();
    if (e.target.id === "scrollLeft") {
      let pos = newAlbum_scroller.current.scrollLeft;
      pos -= 1000;
      newAlbum_scroller.current.scroll({ left: pos, behavior: "smooth" });
    } else if (e.target.id === "scrollRight") {
      let pos = newAlbum_scroller.current.scrollLeft;
      pos += 1000;
      newAlbum_scroller.current.scroll({ left: pos, behavior: "smooth" });
    }
  };

  return (
    <div className="newalbum">
      <div className="newalbum__container">
        <h4 className="newalbum__title">Latest Albums</h4>
        <div className="scrollers" onClick={handleScroll}>
          <ChevronLeft className="icons newalbum__scrollers" id="scrollLeft" />
          <ChevronRight
            className="icons newalbum__scrollers"
            id="scrollRight"
          />
        </div>
      </div>
      <div className="newalbum__cards" ref={newAlbum_scroller}>
        {newAlbum.map(({ name, image, id }) => (
          <div key={id} className="newalbum__cards--space">
            <Cards name={name} id={id} img={image.url} handleClick={getID} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(NewAlbums);
