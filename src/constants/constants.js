const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

const PERMISSION_SCOPE =
  "user-read-private user-read-email user-read-playback-state";

const REDIRECT_URL = "http://localhost:3000/";

export const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URL}&scope=${PERMISSION_SCOPE}&response_type=token&show_dialog={true}`;
