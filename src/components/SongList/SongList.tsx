import * as React from 'react';

import {
  useCurrentSongState,
  useCurrentSongUpdater,
} from '../../context/CurrentSongContext';
import { usePlaylistDataUpdater } from '../../context/PlaylistDataContext';
import { useClient, useAsync } from '../../hooks';
import { formatData } from '../../utils/helpers';
import Loader from '../Loader';
import SongListItem from './SongListItem';

import './SongListStyles.scss';

type AsyncData =
  | Array<{
      id: string;
      name: string;
      thumbnail: string;
      image: string;
      artist: string;
      duration: string;
      durationMs: number;
      explicit: boolean;
      uri: string;
    }>
  | undefined;

interface PropTypes {
  name: string;
  playListType: string;
  playListId: string;
}

type LikedData = Array<string>;

const LIKED_URL = 'https://api.spotify.com/v1/me/tracks';

function SongList({ name, playListType, playListId }: PropTypes) {
  const client = useClient();
  const { setCurrentSong } = useCurrentSongUpdater();
  const { currentSong } = useCurrentSongState();
  const { data, status, run, error } = useAsync<AsyncData>();
  const {
    data: likedData,
    run: likedRun,
    setData: setLikedData,
  } = useAsync<LikedData>();

  const { setPlaylistData } = usePlaylistDataUpdater();
  const URL =
    playListType === 'albums'
      ? ` https://api.spotify.com/v1/albums/${playListId}`
      : `https://api.spotify.com/v1/playlists/${playListId}/tracks`;

  React.useEffect(() => {
    run(client(URL).then((res) => formatData(res, playListType)));
  }, [URL]);

  React.useEffect(() => {
    likedRun(
      client(LIKED_URL).then((d: { items: [{ track: { id: string } }] }) =>
        d.items.map((i) => i.track.id)
      )
    );
  }, [LIKED_URL]);

  React.useEffect(() => {
    if (data) {
      if (currentSong === undefined) {
        setCurrentSong(data[0]);
      }
      setPlaylistData(data);
    }
  }, [data]);

  if (status === 'rejected') {
    throw error as Error;
  }

  const toggleLike = (id: string) => {
    const isLiked = likedData?.includes(id);
    client(LIKED_URL, {
      method: isLiked ? 'DELETE' : 'PUT',
      data: { ids: [id] },
    })
      .then(() => {
        let updatedData;
        if (isLiked) {
          updatedData = likedData?.filter((item) => item !== id);
          setLikedData(updatedData as LikedData);
        } else {
          setLikedData([...(likedData as LikedData), id]);
        }
      })
      .catch((e) => console.error(e));
  };

  return (
    <div className="playlist__container">
      <div className="playlist__header">
        <h2 className="playlist__header__title">{name}</h2>
        <h4 className="playlist__header__subtitle">
          {data?.length} songs on the list
        </h4>
      </div>
      <div className="playlist__tracks">
        {status === 'resolved' ? (
          data?.map((songItem) => (
            <SongListItem
              key={songItem.id}
              handleLike={toggleLike}
              isLiked={likedData?.includes(songItem.id) as boolean}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...songItem}
            />
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default React.memo(SongList);
