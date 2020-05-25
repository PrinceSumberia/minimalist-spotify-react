import React from "react";
import axios from "axios";
import "./App.scss";

const CLIENT_ID = "5c6e98392a5146cf9bfbbf673e6eef70";
const CLIENT_SECRET = "74716614b5794ccfb5a8bcc895c5f7e5";
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
    </div>
  );
}

export default App;
