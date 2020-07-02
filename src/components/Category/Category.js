import React, { useContext } from "react";
import { ArrowLeft } from "react-feather";
import { useHistory } from "react-router-dom";
import { CATEGORIES_URL } from "../../constants/constants";
import { DataContext, CurrentPlayListContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import Cards from "../Cards/Cards";
import "./CategoryStyles.scss";

function Category({ location, match }) {
  const { accessToken } = useContext(DataContext);
  const { setCurrentPlayListId, setCurrentPlayListType } = useContext(
    CurrentPlayListContext
  );
  const history = useHistory();

  const id = match.params.id;

  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const url = `${CATEGORIES_URL}/${id}/playlists`;

  const [data] = useFetchData("", url, headers);

  const handleBack = () => {
    history.push("/browse");
  };

  const getID = (id, name) => {
    setCurrentPlayListId(id);
    setCurrentPlayListType({ name: name, type: "playlists" });
    history.push("/");
  };

  let lists;

  try {
    lists = data.data.playlists.items.map((list) => (
      <div className="category__list" key={list.id}>
        <Cards
          key={list.id}
          id={list.id}
          title={list.name}
          name={list.name}
          img={list.images[0].url}
          subtitle={`Total Tracks: ${list.tracks.total}`}
          handleClick={getID}
        />
      </div>
    ));
  } catch (err) {}

  return (
    <div className="category">
      <div className="category__header">
        <div className="category__back" onClick={handleBack}>
          <ArrowLeft />
        </div>
        <h2 className="category__title">{location.state.name}</h2>
      </div>
      <div className="category__content">{lists}</div>;
    </div>
  );
}

export default Category;
