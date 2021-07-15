export interface CurrentPlayListType {
  name: string;
  id: string;
  type: string;
}

export interface TrackType {
  id: string;
  name: string;
  img: string;
  handleClick:
    | React.Dispatch<React.SetStateAction<CurrentPlayListType>>
    | (({ id, type }: { id: string; type: string }) => void);
  title?: string;
  subtitle?: string;
  type: string;
}

export interface CurrentSongType {
  id: string;
  uri: string;
  name: string;
  artist: string;
  duration: string;
  image: string;
  duration_ms: number;
}
