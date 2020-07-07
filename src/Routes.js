import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
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
import ResetPassword from "./containers/ResetPassword";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/project/:id">
        <Project />
      </Route>
      <UnauthenticatedRoute exact path="/login">
        <Login />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/signup">
        <Signup />
      </UnauthenticatedRoute>
      <UnauthenticatedRoute exact path="/login/reset">
        <ResetPassword />
      </UnauthenticatedRoute>
      <AuthenticatedRoute exact path="/projects/new">
        <CreateProject />
      </AuthenticatedRoute>
      <AuthenticatedRoute exact path="/projects/edit/:id">
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