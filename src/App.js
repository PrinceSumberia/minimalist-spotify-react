import React from "react";
import { Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Login from "./components/Login/Login";
import SpotifyApp from "./components/SpotifyApp/SpotifyApp";

import useScript from "./hooks/useScript";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";

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
