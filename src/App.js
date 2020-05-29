import React from "react";
import { Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./components/Login/Login";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.scss";

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/" render={() => <Login />} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
      </Switch>
    </AuthProvider>
  );
}

export default App;
