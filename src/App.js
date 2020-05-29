import React from "react";
import Login from "./components/Login/Login";
import { Switch, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.scss";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <Route exact path="/dashboard" render={() => <Dashboard />} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
