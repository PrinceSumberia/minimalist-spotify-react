import React from "react";
import "./CardsStyles.scss";

function Cards({ img, name, title, subtitle }) {
  return (
    <div className="card">
      <div className="card__imgContainer">
        <img src={img} alt={name} className="card__imgContainer__img" />
      </div>
      <div className="card__content">
        <h4 className="card__content__title">{title}</h4>
        {/* <p className="card__subtitle">{subtitle}</p> */}
      </div>
    </div>
  );
}

export default Cards;
