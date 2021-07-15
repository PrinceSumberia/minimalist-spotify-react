interface Constructable<T> {
  new (...args: any): T;
}

type FormatReturnData =
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

interface AsyncData {
  name: string;
  length: number;
  images: Array<{ url: string }>;
  tracks?: {
    items: Array<{
      id: string;
      name: string;
      duration_ms: number;
      explicit: boolean;
      uri: string;
      artists: Array<{ name: string }>;
    }>;
  };

  items?: Array<{
    track?: {
      id: string;
      name: string;
      duration_ms: number;
      explicit: boolean;
      uri: string;
      artists: Array<{ name: string }>;
      album: { images: Array<{ url: string }> };
    };
  }>;
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

type SpotifyType = { Player: Constructable<PlayerType> };

declare global {
  interface Window {
    Spotify: SpotifyType;
    onSpotifyWebPlaybackSDKReady: any;
  }
}

type HashType = {
  [key: string]: string;
};

interface SDKProps {
  spotify_uri: string;
  playerInstance: { [key: string]: any };
}

const playViaSDKWithId = (deviceId: string) => {
  const playViasdk = ({
    spotify_uri,
    playerInstance: {
      _options: { getOAuthToken },
    },
  }: SDKProps) => {
    (getOAuthToken as Function)(async (token: string) => {
      await fetch(
        `https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`,
        {
          method: 'PUT',
          body: JSON.stringify({ uris: [spotify_uri] }),
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
    });
  };
  return playViasdk;
};

const millisToMinutesAndSeconds = (millis: number): string => {
  const minutes = Math.floor(millis / 60000);
  const seconds = Number(((millis % 60000) / 1000).toFixed(0));
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const getHash = (): HashType => {
  const hash: HashType = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial: HashType, item) => {
      if (item) {
        const parts = item.split('=');
        // eslint-disable-next-line no-param-reassign
        initial[parts[0]] = decodeURIComponent(parts[1]);
      }
      return initial;
    }, {});
  window.location.hash = '';
  return hash;
};

function formatData(data: AsyncData, playListType: string): FormatReturnData {
  let formattedData;
  if (playListType === 'albums') {
    const { images } = data;
    formattedData = data.tracks?.items.flatMap((item) => {
      if (item) {
        const {
          id,
          name,
          artists,
          duration_ms: durationMs,
          explicit,
          uri,
        } = item;
        const index = name.search(/\(/);
        return {
          id,
          name: (index !== -1 ? name.slice(0, index) : name)
            .trim()
            .toLowerCase(),
          thumbnail: images[images.length - 1].url,
          image: images[1].url,
          artist: artists
            .map((artist) => artist.name)
            .join(', ')
            .toLowerCase(),
          duration: millisToMinutesAndSeconds(durationMs),
          durationMs,
          explicit,
          uri,
        };
      }
      return [];
    });
  } else {
    formattedData = data.items?.flatMap((item) => {
      if (item.track) {
        const {
          id,
          name,
          artists,
          duration_ms: durationMs,
          explicit,
          uri,
        } = item.track;
        const { images } = item.track.album;
        const index = name.search(/\(/);
        return {
          id,
          name: (index !== -1 ? name.slice(0, index) : name)
            .trim()
            .toLowerCase(),
          thumbnail: images[images.length - 1].url,
          image: images[1].url,
          artist: artists
            .map((artist) => artist.name)
            .join(', ')
            .toLowerCase(),
          duration: millisToMinutesAndSeconds(durationMs),
          durationMs,
          explicit,
          uri,
        };
      }
      return [];
    });
  }
  return formattedData;
}

function scroll(
  type: string,
  scrollRef: React.MutableRefObject<{
    scrollLeft: number;
    scroll: ({ left, behavior }: { left: number; behavior: string }) => void;
  }>
): void {
  if (type === 'scrollLeft') {
    let pos = scrollRef.current.scrollLeft;
    pos -= 1000;
    scrollRef.current.scroll({ left: pos, behavior: 'smooth' });
  } else if (type === 'scrollRight') {
    let pos = scrollRef.current.scrollLeft;
    pos += 1000;
    scrollRef.current.scroll({ left: pos, behavior: 'smooth' });
  }
}

async function waitForSpotifyWebPlaybackSDKToLoad(): Promise<SpotifyType> {
  return new Promise((resolve) => {
    if (window.Spotify) {
      resolve(window.Spotify);
    }
  });
}

export {
  playViaSDKWithId,
  millisToMinutesAndSeconds,
  getHash,
  scroll,
  waitForSpotifyWebPlaybackSDKToLoad,
  formatData,
};
