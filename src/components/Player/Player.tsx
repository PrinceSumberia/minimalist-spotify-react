import * as React from 'react';

import classNames from 'classnames';
import { PauseCircle, PlayCircle, SkipBack, SkipForward } from 'react-feather';
import { toast } from 'react-toastify';

import {
  useCurrentSongState,
  useCurrentSongUpdater,
} from '../../context/CurrentSongContext';
import { usePlaylistDataState } from '../../context/PlaylistDataContext';
import { useInterval, useViewport } from '../../hooks';
import {
  millisToMinutesAndSeconds,
  playViaSDKWithId,
} from '../../utils/helpers';

import './PlayerStyles.scss';

interface PlayerType {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: Function;
  pause: () => void;
  resume: () => void;
  seek: (param: number) => void;
  getCurrentState: () => Promise<Record<string, string>>;
}

interface PropType {
  isPremium: boolean;
  spotifyPlayer: PlayerType;
  deviceId: string;
}

const settings = {
  fill: 'red',
  background: ' #faf7f5',
};

const breakpoint = 1100;

type State = { status: string; isPlaying: boolean };

type ActionType = { type: 'PLAY' } | { type: 'TOGGLE' };

function useSafeDispatch<Action>(dispatch: React.Dispatch<Action>) {
  const mounted = React.useRef(false);

  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  return React.useCallback(
    (...args: Parameters<React.Dispatch<Action>>) => {
      if (mounted.current) {
        dispatch(...args);
      }
    },
    [dispatch]
  );
}

function statusReducer(state: State, action: ActionType): State {
  switch (action.type) {
    case 'PLAY':
      return { isPlaying: true, status: 'play' };
    case 'TOGGLE':
      return {
        isPlaying: state.status === 'pause',
        status: state.status === 'pause' ? 'resume' : 'pause',
      };
    default:
      throw new Error(`Unhandled action: ${JSON.stringify(action)}`);
  }
}

function Player({ isPremium, spotifyPlayer, deviceId }: PropType) {
  const width = useViewport();
  const rangeRef = React.useRef<HTMLInputElement | null>(null);
  const [currentPosition, setCurrentPosition] = React.useState('0.00');
  const { currentSong } = useCurrentSongState();
  const { setCurrentSong } = useCurrentSongUpdater();
  const { playlistData } = usePlaylistDataState();
  const [playerStatus, unSafeDispatch] = React.useReducer(statusReducer, {
    status: 'initial',
    isPlaying: false,
  });

  const playViasdk = playViaSDKWithId(deviceId);

  const dispatch = useSafeDispatch(unSafeDispatch);

  React.useEffect(() => {
    if (playerStatus.status === 'play') {
      playViasdk({
        playerInstance: spotifyPlayer,
        spotify_uri: currentSong!.uri,
      });
    } else if (playerStatus.status === 'pause') {
      spotifyPlayer.pause();
    } else if (playerStatus.status === 'resume') {
      spotifyPlayer.resume();
    }
  }, [playerStatus]);

  React.useEffect(() => {
    if (currentSong) {
      if (playerStatus.status !== 'initial') {
        dispatch({ type: 'PLAY' });
      }
    }
  }, [currentSong]);

  const handlePlayPause = () => {
    const isMobile = window.matchMedia(
      'only screen and (max-width: 760px)'
    ).matches;

    if (isMobile) {
      toast.dark('Playing tracks on a mobile device is not supported');
      return;
    }

    if (!isPremium) {
      toast.dark('Spotify Premium is Required To Play Tracks!');
      return;
    }

    if (!spotifyPlayer) {
      toast.dark(
        'Unable to Initialize Player. Please try another browser or disable any script blocking extension.'
      );
      return;
    }

    if (playerStatus.status === 'initial') {
      dispatch({ type: 'PLAY' });
      return;
    }

    dispatch({ type: 'TOGGLE' });
  };

  const playNextSong = () => {
    if (playlistData) {
      const currentPlayingSongIndex = playlistData.findIndex(
        (item) => item.id === currentSong!.id
      );

      const nextSongIndex =
        currentPlayingSongIndex === playlistData.length - 1
          ? 0
          : Number(currentPlayingSongIndex) + 1;

      setCurrentSong(playlistData[nextSongIndex]);
      if (playerStatus.isPlaying) {
        dispatch({ type: 'PLAY' });
      }
    }
  };

  const playPrevSong = () => {
    if (playlistData) {
      const currentPlayingSongIndex = playlistData.findIndex(
        (item) => item.id === currentSong!.id
      );

      if (currentPlayingSongIndex !== 0) {
        const prevSongIndex = currentPlayingSongIndex - 1;
        setCurrentSong(playlistData[prevSongIndex]);
        setCurrentSong(playlistData[prevSongIndex]);

        if (playerStatus.isPlaying) {
          dispatch({ type: 'PLAY' });
        }
      }
    }
  };

  useInterval(
    () => {
      if (rangeRef.current) {
        rangeRef.current.max = String(currentSong!.durationMs);
        spotifyPlayer
          .getCurrentState()
          .then((state) => {
            if (!state) {
              console.error(
                'User is not playing music through the Web Playback SDK'
              );
              return;
            }
            const { position } = state;
            rangeRef.current!.value = position;
          })
          .catch((err) => console.error(err));

        setCurrentPosition(
          millisToMinutesAndSeconds(Number(rangeRef.current.value))
        );
        const percentage =
          (100 * Number(rangeRef.current.value)) / Number(rangeRef.current.max);
        const bg = `linear-gradient(90deg, ${settings.fill} ${percentage}%, ${
          settings.background
        } ${percentage + 0.1}%)`;
        rangeRef.current.style.background = bg;

        if (Math.round(percentage) === 100) {
          playNextSong();
        }
      }
    },
    playerStatus.isPlaying ? 1000 : null
  );

  const handleChange = () => {
    spotifyPlayer.seek(Number(rangeRef.current!.value));
  };

  return width <= breakpoint ? (
    <div className="miniPlayer">
      <div className="miniPlayer__meta">
        <div className="miniPlayer__media">
          <img
            className="miniPlayer__media__img"
            src={currentSong?.image}
            alt={currentSong?.name}
          />
        </div>
        <div className="miniPlayer__name">
          <h3 className="miniPlayer__title">{currentSong?.name}</h3>
          <p className="miniPlayer__subtitle">{currentSong?.artist}</p>
        </div>
      </div>
      <div className="miniPlayer__controls">
        <div className="miniPlayer__buttons">
          <SkipBack className="miniPlayer__icon" onClick={playPrevSong} />
          <div
            className="miniPlayer__controls__play"
            onClick={handlePlayPause}
            onKeyPress={handlePlayPause}
            role="button"
            tabIndex={0}
          >
            {playerStatus.isPlaying ? (
              <PauseCircle className="miniPlayer__icon miniPlayer__icon__play" />
            ) : (
              <PlayCircle className="miniPlayer__icon miniPlayer__icon__pause" />
            )}
          </div>
          <SkipForward className="miniPlayer__icon" onClick={playNextSong} />
        </div>
        <div className="miniPlayer__progressCont">
          <p>{currentPosition}</p>
          <input
            type="range"
            ref={rangeRef}
            className="miniPlayer__progress"
            defaultValue={0}
            max={currentSong?.durationMs}
            onChange={handleChange}
          />
          <p>{currentSong?.duration}</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="player">
      <div className="player__image__container">
        <img
          className="player__image__container__img"
          src={currentSong?.image}
          alt={currentSong?.name}
        />
      </div>
      <div className="player__details">
        <h3 className="player__title">{currentSong?.name}</h3>
        <p className="player__subtitle">{currentSong?.artist}</p>
      </div>
      <div className="player__time">
        <p>{currentPosition}</p>
        <p>{currentSong?.duration}</p>
      </div>
      <input
        type="range"
        ref={rangeRef}
        className="player__progress"
        defaultValue={0}
        max={currentSong?.durationMs}
        onChange={handleChange}
      />
      <div className="player__control">
        <SkipBack className="player__icon" onClick={playPrevSong} />
        <div
          className={classNames('player__control__play', {
            player__animate: playerStatus.isPlaying,
          })}
          onClick={handlePlayPause}
          onKeyPress={handlePlayPause}
          tabIndex={0}
          role="button"
        >
          {playerStatus.isPlaying ? (
            <PauseCircle className="player__icon player__icon__play" />
          ) : (
            <PlayCircle className="player__icon player__icon__pause" />
          )}
        </div>
        <SkipForward className="player__icon" onClick={playNextSong} />
      </div>
    </div>
  );
}

export default Player;
