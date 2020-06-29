import React, { useState } from "react";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import Podcast from "../Podcast/Podcast";
import SearchForm from "../SearchForm/SearchForm";
import "./BrowseStyles.scss";

function Topchart() {
  return <h1>Topchart</h1>;
}

function Browse() {
  const [currentView, setCurrentView] = useState("category");
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
