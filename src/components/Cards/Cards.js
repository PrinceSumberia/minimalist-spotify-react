import React from "react";
import "./CardsStyles.scss";

function Cards({ id, img, name, title, subtitle, getID }) {
  const handleClick = () => {
    getID(id);
  };
  return (
    <div className="card" onClick={handleClick}>
      <div className="card__imgContainer">
        <img src={img} alt={name} className="card__imgContainer__img" />
      </div>
      <div className="card__content">
        <h4 className="card__content__title">{title}</h4>
        <p className="card__content__subtitle">{subtitle}</p>
      </div>
    </div>
  );
}

export default Cards;
