import React, { useContext, useEffect } from "react";
import { DataContext, NewAlbumContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";

function NewAlbums() {
  const { accessToken } = useContext(DataContext);
  const { newAlbum, setNewAlbum } = useContext(NewAlbumContext);

  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    if (data.status === 200) {
      console.log(data.data.albums.items);
    }

    // console.log(data.data);
    // setNewAlbum(data);
  }, [setNewAlbum, data]);

  return (
    <div>
      <h1>New NewAlbums goes here</h1>
    </div>
  );
}

export default NewAlbums;
