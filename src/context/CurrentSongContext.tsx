import * as React from 'react';

type PropTypes = { children: React.ReactNode };
type State =
  | {
      id: string;
      uri: string;
      name: string;
      artist: string;
      duration: string;
      image: string;
      durationMs: number;
    }
  | undefined;

type SetState = React.Dispatch<React.SetStateAction<State>>;

const CurrentSongStateContext = React.createContext<
  { currentSong: State } | undefined
>(undefined);
const CurrentSongUpdaterContext = React.createContext<
  { setCurrentSong: SetState } | undefined
>(undefined);

function useCurrentSongState() {
  const context = React.useContext(CurrentSongStateContext);
  if (!context) {
    throw new Error(
      `useCurrentSongState must be used within a CurrentSongProvider`
    );
  }
  return context;
}

function useCurrentSongUpdater() {
  const context = React.useContext(CurrentSongUpdaterContext);
  if (!context) {
    throw new Error(
      `useCurrentSongUpdater must be used within a CurrentSongProvider`
    );
  }
  return context;
}

function useCurrentSongStateWithUpdater() {
  return {
    currentSong: useCurrentSongState(),
    setCurrentSong: useCurrentSongUpdater(),
  };
}

function CurrentSongProvider({ children }: PropTypes) {
  const [currentSong, setCurrentSong] = React.useState<State>(undefined);

  return (
    <CurrentSongStateContext.Provider value={{ currentSong }}>
      <CurrentSongUpdaterContext.Provider value={{ setCurrentSong }}>
        {children}
      </CurrentSongUpdaterContext.Provider>
    </CurrentSongStateContext.Provider>
  );
}

export {
  CurrentSongProvider,
  useCurrentSongState,
  useCurrentSongUpdater,
  useCurrentSongStateWithUpdater,
};
