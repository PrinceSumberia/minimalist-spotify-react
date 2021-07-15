import * as React from 'react';

import { TrackType } from '../../utils/types';
import './CardStyles.scss';

const Card = ({
  id,
  img,
  name,
  title,
  subtitle,
  handleClick,
  type,
}: TrackType) => (
  <div
    className="card"
    onClick={() => handleClick({ name, id, type })}
    onKeyPress={() => handleClick({ name, id, type })}
    role="button"
    tabIndex={0}
  >
    <div className="card__imgContainer">
      <img src={img} alt={name} className="card__imgContainer__img" />
    </div>
    <div className="card__content">
      <h4 className="card__content__title">{title}</h4>
      <p className="card__content__subtitle">{subtitle}</p>
    </div>
  </div>
);

export default Card;
