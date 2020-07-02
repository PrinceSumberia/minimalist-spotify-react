import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Login from "./components/Login/Login";
import SpotifyApp from "./components/SpotifyApp/SpotifyApp";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import useScript from "./hooks/useScript";
import PrivateRoute from "./PrivateRoute";

function App() {
  useScript("https://sdk.scdn.co/spotify-player.js");

  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/login" render={() => <Login />} />
        <DataProvider>
          <PrivateRoute exact path="/*" component={SpotifyApp} />
        </DataProvider>
      </Switch>
    </AuthProvider>
  );
}

export default App;
