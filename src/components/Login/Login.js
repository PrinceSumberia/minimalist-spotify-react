import React, { useEffect } from "react";
import axios from "axios";

let CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

let scope = "user-read-private user-read-email user-read-playback-state";
const localhost = "http://localhost:3000/";

let URL = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${localhost}&scope=${scope}&response_type=token`;

// Get the hash of the url
let hash = window.location.hash
  .substring(1)
  .split("&")
  .reduce(function (initial, item) {
    if (item) {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);
    }
    return initial;
  }, {});

window.location.hash = "";

let token = "";

function Login() {
  useEffect(() => {
    token = hash.access_token;
    const getData = async () => {
      const response = await axios.get("https://api.spotify.com/v1/me", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      return response.data;
    };
    console.log(getData().then((data) => console.log(data)));
  }, []);
  return (
    <div>
      <h4 className="heading">Please Login With your Spotify Account.</h4>
      <a href={URL}>Login with Spotify</a>
    </div>
  );
}

export default Login;
