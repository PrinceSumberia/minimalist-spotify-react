const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const GLOBAL_TRACK_ID = "37i9dQZEVXbMDoHDwVN2tF";
const PERMISSION_SCOPE =
  "streaming user-modify-playback-state user-read-private user-read-email user-read-playback-state user-top-read";

const REDIRECT_URL = "https://minimalistspotify.netlify.app/";
// const REDIRECT_URL = "http://localhost:3000/";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PERMISSION_SCOPE}&response_type=token&show_dialog={true}`;

export const FEATURES_URL = "https://api.spotify.com/v1/audio-features/";
export const ANALYSIS_URL = "https://api.spotify.com/v1/audio-analysis/";
export const FEATURED_PLAYLIST_URL =
  "https://api.spotify.com/v1/browse/featured-playlists/";
export const NEWALBUMS_URL = "https://api.spotify.com/v1/browse/new-releases";
