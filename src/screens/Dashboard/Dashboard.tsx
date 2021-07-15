import * as React from 'react';

import { useLocation } from 'react-router-dom';

import NewAlbums from '../../components/NewAlbums';
import SongList from '../../components/SongList';
import TopChart from '../../components/TopChart';
import { GLOBAL_TRACK_ID } from '../../constants';

import './DashboardStyles.scss';

interface CurrentPlayListType {
  name: string;
  id: string;
  type: string;
}

const initialPlayListInfo = {
  id: GLOBAL_TRACK_ID,
  name: 'Most Popular',
  type: 'playlists',
};

function Dashboard() {
  const location = useLocation<{ currentPlayList: CurrentPlayListType }>();

  const [{ name, id, type }, setCurrentPlayList] =
    React.useState<CurrentPlayListType>(() => {
      try {
        return location.state.currentPlayList ?? initialPlayListInfo;
      } catch (error) {
        return initialPlayListInfo;
      }
    });

  return (
    <>
      <TopChart setCurrentPlayList={setCurrentPlayList} />
      <div className="main__content">
        <div className="main__toptracks">
          <SongList name={name} playListId={id} playListType={type} />
        </div>
        <div className="main__comingsoon">
          <NewAlbums setCurrentPlayList={setCurrentPlayList} />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
