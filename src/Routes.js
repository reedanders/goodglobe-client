import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Home from "./containers/Home";
import Landing from "./containers/Landing";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import Project from "./containers/Project";
import CreateProject from "./containers/CreateProject";
import EditProject from "./containers/EditProject";
import Payment from "./containers/Payment";
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
      <Route exact path="/home">
        <Home />
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
        <CreateProject />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/projects/:id">
        <EditProject />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/payment">
        <Payment />
      </AuthenticatedRoute>
      <Redirect exact from="/dashboard" to="/dashboard/home" />
      <AuthenticatedRoute exact path="/dashboard/:page?" render={props => <Dashboard {...props} />}/>
      {/* Finally, catch all unmatched routes */}
  	  <Route>
  	    <NotFound />
  	  </Route>
    </Switch>

  );
}