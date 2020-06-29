import React, { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import useFetchData from "../../hooks/useFetchData";
import SearchForm from "../SearchForm/SearchForm";
import "./BrowseStyles.scss";

function Categories() {
  const { accessToken } = useContext(DataContext);
  const headers = {
    Authorization: "Bearer " + accessToken,
  };

  const [data] = useFetchData(
    "",
    "https://api.spotify.com/v1/browse/categories",
    headers
  );

  let result;
  try {
    result = data.data.categories.items.map((item) => (
      <div key={item.id} className="browse__categories__container">
        <div className="browse__media">
          <img
            alt={item.name}
            src={item.icons[0].url}
            className="browse__media__img"
          />
        </div>
        <div className="browse__title">
          <h3>{item.name}</h3>
        </div>
      </div>
    ));
  } catch (err) {}
  return <div className="browse__categories">{result}</div>;
}

function Featured() {
  return <h1>Featured</h1>;
}
function Podcast() {
  return <h1>Podcasts</h1>;
}
function Topchart() {
  return <h1>Topchart</h1>;
}

function Browse() {
  // const { accessToken } = useContext(DataContext);
  // const headers = {
  //   Authorization: "Bearer " + accessToken,
  // };

  const [currentView, setCurrentView] = useState("category");
  // const [data] = useFetchData("", RECOMMENDATION_URL, headers);
  // const [data] = useFetchData(
  //   "",
  //   "https://api.spotify.com/v1/recommendations/available-genre-seeds",
  //   headers
  // );
  // console.log(data);
  // // console.log(data);
  // // console.log(data2);
  // const [data2] = useFetchData(
  //   "",
  //   "https://api.spotify.com/v1/browse/categories/toplists/playlists",
  //   headers
  // );

  const handleClick = (e) => {
    if (e.target.tagName.toLowerCase() === "button") {
      setCurrentView(e.target.value);
    }
  };

  const getCurrentView = () => {
    switch (currentView) {
      case "category":
        return <Categories />;
      case "featured":
        return <Featured />;
      case "topchart":
        return <Topchart />;
      case "podcast":
        return <Podcast />;
      default:
        return <Categories />;
    }
  };

  return (
    <div className="browse">
      <SearchForm />
      <div className="btn-container" onClick={handleClick}>
        <button className="btn-view" value="category">
          Categories
        </button>
        <button className="btn-view" value="featured">
          Featured
        </button>
        <button className="btn-view" value="topchart">
          Top Charts
        </button>
        <button className="btn-view" value="podcast">
          Podcasts
        </button>
      </div>
      <div className="browse__container">
        <div className="browse__header">
          <h3 className="browse__mainTitle">{currentView.toUpperCase()}</h3>
        </div>
        {getCurrentView()}
      </div>
    </div>
  );
}

export default Browse;
