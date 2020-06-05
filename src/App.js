import React, { useEffect, useContext } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { AuthProvider, AccessTokenContext } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import PrivateRoute from "./PrivateRoute";
import useScript from "./hooks/useScript";

function App() {
  useScript("https://sdk.scdn.co/spotify-player.js");

  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <DataProvider>
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
        </DataProvider>
      </Switch>
    </AuthProvider>
  );
}

export default App;
