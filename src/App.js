import React, { useState } from "react";
import Login from "./components/Login/Login";
import { Switch, Route, Redirect } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.scss";
import PrivateRoute from "./PrivateRoute";

function App() {
  return (
    <Switch>
      <Route exact path="/" render={() => <Login />} />
      <Route exact path="/dashboard" render={() => <Dashboard />} />
      {/* <PrivateRoute exact path="/dashboard" render={() => <Dashboard />} /> */}
    </Switch>
  );
}

export default App;
