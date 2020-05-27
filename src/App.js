import React from "react";
import axios from "axios";
import "./App.scss";
import Login from "./Login";

let id = process.env.REACT_APP_CLIENT_ID;
let sec = process.env.REACT_APP_CLIENT_SECRET;

let userAccessToken;

function App() {
  const getData = async () => {
    const response = await axios.get("https://api.spotify.com/v1", {
      headers: {
        Authorization: `Bearer ${userAccessToken}`,
      },
    });
    const data = response.data;
    console.log(data);
  };
  return (
    <div className="">
      <h1 className="heading">Hello World</h1>
      <p className="para">this is a sample para</p>
      <button onClick={getData}>Fetch</button>
      <Login />
    </div>
  );
}

export default App;
