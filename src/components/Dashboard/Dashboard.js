import React, { memo } from "react";
import "react-toastify/dist/ReactToastify.css";
import {
  NewAlbumProvider,
  TopPlayListProvider,
} from "../../context/DataContext";
import NewAlbums from "../NewAlbums/NewAlbums";
import Playlist from "../Playlist/Playlist";
import TopChart from "../TopChart/TopChart";
import "./DashBoardStyles.scss";
import FadeIn from "react-fade-in";

function Dashboard() {
  return (
    <FadeIn>
      <TopPlayListProvider>
        <TopChart />
      </TopPlayListProvider>
      <div className="main__content">
        <div className="main__toptracks">
          <Playlist />
        </div>
        <div className="main__comingsoon">
          <NewAlbumProvider>
            <NewAlbums />
          </NewAlbumProvider>
        </div>
      </div>
    </FadeIn>
  );
}

export default memo(Dashboard);
