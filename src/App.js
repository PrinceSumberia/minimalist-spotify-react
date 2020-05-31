import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.scss";
import Dashboard from "./components/Dashboard/Dashboard";
import Login from "./components/Login/Login";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import PrivateRoute from "./PrivateRoute";

function App() {
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
