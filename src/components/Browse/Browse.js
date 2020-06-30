import React, { useState } from "react";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import Podcast from "../Category/Category";
import SearchForm from "../SearchForm/SearchForm";
import "./BrowseStyles.scss";
import classNames from "classnames";

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
      <div className="btn-container" onClick={handleClick}>
        <button
          className={classNames("btn-view", {
            "btn-view--active": currentView === "category",
          })}
          value="category"
        >
          Categories
        </button>
        <button
          className={classNames("btn-view", {
            "btn-view--active": currentView === "featured",
          })}
          value="featured"
        >
          Featured
        </button>
        <button
          className={classNames("btn-view", {
            "btn-view--active": currentView === "topchart",
          })}
          value="topchart"
        >
          Top Charts
        </button>
      </div>
      <div className="browse__container">
        {/* <div className="browse__header">
          <h3 className="browse__mainTitle">{currentView.toUpperCase()}</h3>
        </div> */}
        {getCurrentView()}
      </div>
    </div>
  );
}

export default Browse;
