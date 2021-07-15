import * as React from 'react';

type PropTypes = { children: React.ReactNode };
type State =
  | Array<{
      id: string;
      uri: string;
      name: string;
      artist: string;
      duration: string;
      image: string;
      durationMs: number;
    }>
  | undefined;

type SetState = React.Dispatch<React.SetStateAction<State>>;

const PlaylistDataStateContext = React.createContext<
  { playlistData: State } | undefined
>(undefined);
const PlaylistDataUpdaterContext = React.createContext<
  { setPlaylistData: SetState } | undefined
>(undefined);

function usePlaylistDataState() {
  const context = React.useContext(PlaylistDataStateContext);
  if (!context) {
    throw new Error(
      `usePlaylistDataState must be used within a PlaylistDataContext`
    );
  }
  return context;
}

function usePlaylistDataUpdater() {
  const context = React.useContext(PlaylistDataUpdaterContext);
  if (!context) {
    throw new Error(
      `usePlaylistDataUpdater must be used within a PlaylistDataContext`
    );
  }
  return context;
}

function PlaylistDataProvider({ children }: PropTypes) {
  const [playlistData, setPlaylistData] = React.useState<State>();

  return (
    <PlaylistDataStateContext.Provider value={{ playlistData }}>
      <PlaylistDataUpdaterContext.Provider value={{ setPlaylistData }}>
        {children}
      </PlaylistDataUpdaterContext.Provider>
    </PlaylistDataStateContext.Provider>
  );
}

export { PlaylistDataProvider, usePlaylistDataState, usePlaylistDataUpdater };
