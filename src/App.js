import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import SpotifyApp from "./components/SpotifyApp/SpotifyApp";
import TrackAnalysis from "./components/TrackAnalysis/TrackAnalysis";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import useScript from "./hooks/useScript";
import PrivateRoute from "./PrivateRoute";

function App() {
  useScript("https://sdk.scdn.co/spotify-player.js");

  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <DataProvider>
          <PrivateRoute exact path="/dashboard" component={SpotifyApp} />
          <PrivateRoute exact path="/tracks/:id" component={TrackAnalysis} />
        </DataProvider>
      </Switch>
    </AuthProvider>
  );
}

export default App;
