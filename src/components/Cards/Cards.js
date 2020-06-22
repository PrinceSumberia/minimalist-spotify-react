import React from "react";
import "./CardsStyles.scss";
import { memo } from "react";

function Cards({ id, img, name, title, subtitle, handleClick }) {
  const handleCardClick = () => {
    handleClick(id, name);
  };
  return (
    <div className="card" onClick={handleCardClick}>
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

export default memo(Cards);
