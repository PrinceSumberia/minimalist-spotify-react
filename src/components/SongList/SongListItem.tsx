import * as React from 'react';

import { faFlask, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useCurrentSongUpdater } from '../../context/CurrentSongContext';
import { useViewport } from '../../hooks';

import './SongListItemStyles.scss';

interface PropType {
  id: string;
  name: string;
  thumbnail: string;
  image: string;
  artist: string;
  duration: string;
  durationMs: number;
  explicit: boolean;
  isLiked: boolean;
  uri: string;
  view?: string;
  handleLike?: Function;
}

function SongListItem({
  id,
  name,
  image,
  artist,
  duration,
  durationMs,
  isLiked,
  explicit,
  uri,
  thumbnail,
  view,
  handleLike = () => {},
}: PropType) {
  const history = useHistory();
  const { setCurrentSong } = useCurrentSongUpdater();

  const handleClick = (e: React.SyntheticEvent<SVGSVGElement>) => {
    e.stopPropagation();
    handleLike(id);
  };

  const width = useViewport();
  const breakpoint = 1100;

  const handlePlay = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (width <= breakpoint) {
      toast.dark("Tracks can't be played on Mobile Devices");
      return;
    }
    setCurrentSong({ uri, name, artist, duration, image, id, durationMs });
  };

  const handleAnalyse = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    history.push({
      pathname: `/tracks/${id}`,
      state: { uri, name, artist, duration, image, id, durationMs, explicit },
    });
  };

  return (
    <div
      className="song"
      onClick={handlePlay}
      onKeyPress={handlePlay}
      role="button"
      tabIndex={0}
    >
      <div className="song__imgCont">
        <img src={thumbnail} alt="" className="song__imgCont__img" />
      </div>
      <div className="song__name">{name}</div>
      <div className="song__artist">{artist}</div>
      {view !== 'minimal' && (
        <>
          <div className="song__meta">
            <div className="meta__duration">{duration}</div>
            <div className="meta__analyse">
              <FontAwesomeIcon icon={faFlask} onClick={handleAnalyse} />
            </div>
            <div
              className={classNames('meta__like', {
                'meta__like--filled': isLiked,
              })}
            >
              <FontAwesomeIcon icon={faHeart} onClick={handleClick} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

SongListItem.defaultProps = {
  view: '',
  handleLike: () => {},
};

export default React.memo(SongListItem);
