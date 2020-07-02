const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

export const GLOBAL_TRACK_ID = "37i9dQZEVXbMDoHDwVN2tF";
const PERMISSION_SCOPE =
  "streaming user-modify-playback-state user-read-private user-read-email user-read-playback-state user-top-read user-library-modify user-library-read";

const REDIRECT_URL = "https://minimalistspotify.netlify.app/";
// const REDIRECT_URL = "http://localhost:3000/login";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PERMISSION_SCOPE}&response_type=token&show_dialog={true}`;

export const BASE_URL = "https://api.spotify.com/v1/";
export const FEATURES_URL = `${BASE_URL}audio-features/`;
export const ANALYSIS_URL = `${BASE_URL}audio-analysis/`;
export const FEATURED_PLAYLIST_URL = `${BASE_URL}browse/featured-playlists/`;
export const TOP_PLAYLIST_URL = `${BASE_URL}browse/categories/toplists/playlists`;
export const NEWALBUMS_URL = `${BASE_URL}browse/new-releases`;
export const SERACH_URL = `${BASE_URL}search`;
export const RECOMMENDATION_URL = `${BASE_URL}recommendations`;
export const CATEGORIES_URL = `${BASE_URL}browse/categories`;
