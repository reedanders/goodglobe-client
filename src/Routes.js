import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewProject from "./containers/NewProject";
import Project from "./containers/Project";
import Projects from "./containers/Projects";
import Settings from "./containers/Settings";
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/NotFound";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/project">
        <Project />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/projects/new">
        <NewProject />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/projects/:id">
        <Projects />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/settings">
        <Settings />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/dashboard">
        <Dashboard />
      </AuthenticatedRoute>
      {/* Finally, catch all unmatched routes */}
  	  <Route>
  	    <NotFound />
  	  </Route>
    </Switch>

  );
}