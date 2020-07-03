import React, { useContext, useEffect, memo } from "react";
import {
  CurrentPlayListContext,
  DataContext,
  NewAlbumContext,
} from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./NewAlbumsStyles.scss";
import { NEWALBUMS_URL } from "../../constants/constants";

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
    console.log(data.data);
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

  return (
    <div className="newalbum">
      <h4 className="newalbum__title">Latest Albums</h4>
      <div className="newalbum__cards">
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
