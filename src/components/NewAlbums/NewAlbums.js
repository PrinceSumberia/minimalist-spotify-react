import React, { useContext, useEffect } from "react";
import { DataContext, NewAlbumContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";

function NewAlbums() {
  const { accessToken } = useContext(DataContext);
  const { newAlbum, setNewAlbum } = useContext(NewAlbumContext);

  const headers = {
    Authorization: "Bearer " + accessToken,
  };
  const url = "https://api.spotify.com/v1/browse/new-releases";
  const [data] = useFetchData("", url, headers);

  useEffect(() => {
    let albumData = [];
    if (data.status === 200) {
      albumData = data.data.albums.items.map((alb) => {
        const index = alb.name.search(/\(/);
        return {
          name: (index !== -1 ? alb.name.slice(0, index) : alb.name)
            .trim()
            .toLowerCase(),
          uri: alb.uri,
          id: alb.id,
          image: alb.images[1],
        };
      });
    }
    setNewAlbum(albumData);
    console.log(albumData);
  }, [setNewAlbum, data]);

  return (
    <div>
      <h4>Latest Albums</h4>
      {newAlbum.map(({ name, image }) => (
        <Cards name={name} img={image.url} />
      ))}
    </div>
  );
}

export default NewAlbums;
