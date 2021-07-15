import * as React from 'react';

import { ErrorBoundary } from 'react-error-boundary';
import { ToastContainer } from 'react-toastify';

import { useAuth } from '../../context/AuthContext';
import { CurrentSongProvider } from '../../context/CurrentSongContext';
import { PlaylistDataProvider } from '../../context/PlaylistDataContext';
import { useAsync, useClient, useScript } from '../../hooks';
import ErrorFallback from '../ErrorFallback';
import Footer from '../Footer';
import Navbar from '../Navbar';
import Player from '../Player';
import Profile from '../Profile';

import 'react-toastify/dist/ReactToastify.css';
import './LayoutStyles.scss';

interface PropTypes {
  children: React.ReactNode;
}

interface ResponseDataType {
  email: string;
  name: string;
  display_name: string;
  product: string;
  images: [{ url: string }];
}

interface PlayerType {
  connect: () => Promise<boolean>;
  disconnect: () => void;
  addListener: Function;
  pause: () => void;
  resume: () => void;
  seek: (param: number) => void;
  getCurrentState: () => Promise<Record<string, string>>;
}

const Layout = ({ children }: PropTypes) => {
  const playerRef = React.useRef<PlayerType | undefined>();
  const [deviceId, setDeviceId] = React.useState<string | undefined>();
  const { logout, token } = useAuth();
  const { data, run, status } = useAsync<ResponseDataType>();
  const scriptStatus = useScript('https://sdk.scdn.co/spotify-player.js');
  const client = useClient();

  React.useEffect(() => {
    run(client('https://api.spotify.com/v1/me'));
  }, []);

  const initializePlayer = (
    ref: React.MutableRefObject<PlayerType>,
    accessToken: string
  ) => {
    // eslint-disable-next-line no-param-reassign
    ref.current = new window.Spotify.Player({
      getOAuthToken: (cb: CallableFunction) => {
        cb(accessToken);
      },
      name: 'SDK Player',
      volume: 0.5,
    });

    ref.current.addListener('ready', ({ device_id }: { device_id: string }) => {
      setDeviceId(device_id);
    });

    ref.current.addListener('not_ready', (error: Error) => {
      console.error(error);
    });

    ref.current.addListener('player_state_changed', () => {});

    ref.current.addListener('initialization_error', (error: Error) =>
      console.error('initialization_error', error.message)
    );
    ref.current.addListener('authentication_error', (error: Error) =>
      console.error('authentication_error', error.message)
    );
    ref.current.addListener('account_error', (error: Error) =>
      console.error('account_error', error.message)
    );
    ref.current.addListener('playback_error', (error: Error) =>
      console.error('playback_error', error.message)
    );

    ref.current?.connect();
  };

  React.useEffect(() => {
    if (scriptStatus === 'ready') {
      if (!window.onSpotifyWebPlaybackSDKReady) {
        try {
          window.onSpotifyWebPlaybackSDKReady = initializePlayer(
            playerRef as React.MutableRefObject<PlayerType>,
            token as string
          );
        } catch (error) {
          console.error(error);
        }
      } else {
        initializePlayer(
          playerRef as React.MutableRefObject<PlayerType>,
          token as string
        );
      }
    }
  }, [scriptStatus]);

  return (
    <div className="container">
      <ErrorBoundary FallbackComponent={ErrorFallback} onReset={() => logout()}>
        <CurrentSongProvider>
          <PlaylistDataProvider>
            <aside className="sidebar">
              {status === 'resolved' && (
                <Profile
                  name={data!.display_name}
                  email={data!.email}
                  src={data!.images[0].url}
                  logout={logout}
                />
              )}
              <Navbar />
              {status === 'resolved' && (
                <Player
                  isPremium={data?.product === 'premium'}
                  spotifyPlayer={playerRef.current as PlayerType}
                  deviceId={deviceId as string}
                />
              )}
            </aside>
            <main className="mainContent">
              {children}
              <Footer />
              <ToastContainer />
            </main>
          </PlaylistDataProvider>
        </CurrentSongProvider>
      </ErrorBoundary>
    </div>
  );
};

export default Layout;
