import classNames from "classnames";
import React, { useState } from "react";
import Categories from "../Categories/Categories";
import Featured from "../Featured/Featured";
import "./BrowseStyles.scss";

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
      </div>
      <div className="browse__container">{getCurrentView()}</div>
    </div>
  );
}

export default Browse;
