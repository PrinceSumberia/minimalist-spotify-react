import React, { useContext, useEffect } from "react";
import { DataContext, NewAlbumContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./NewAlbumsStyles.scss";

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
      albumData = data.data.albums.items.slice(0, 17).map((alb, i) => {
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
  }, [setNewAlbum, data]);

  return (
    <div className="newalbum">
      <h4 className="newalbum__title">Latest Albums</h4>
      <div className="newalbum__cards">
        {newAlbum.map(({ name, image, id }) => (
          <div key={id} className="newalbum__cards--space">
            <Cards name={name} img={image.url} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewAlbums;
