import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import asyncComponent from "./components/AsyncComponent";

import AuthenticatedRoute from "./components/AuthenticatedRoute";
import UnauthenticatedRoute from "./components/UnauthenticatedRoute";
import Dashboard from "./containers/Dashboard";
import NotFound from "./containers/NotFound";

const AsyncLanding = asyncComponent(() => import("./containers/Landing"));
const AsyncLogin = asyncComponent(() => import("./containers/Login"));
const AsyncSignup = asyncComponent(() => import("./containers/Signup"));
const AsyncProject = asyncComponent(() => import("./containers/Project"));
const AsyncCreateProject = asyncComponent(() => import("./containers/CreateProject"));
const AsyncEditProject = asyncComponent(() => import("./containers/EditProject"));
const AsyncPayment = asyncComponent(() => import("./containers/Payment"));
const AsyncDiscover = asyncComponent(() => import("./containers/discover/Discover"));
const AsyncAbout = asyncComponent(() => import("./containers/About"));
const AsyncTeam = asyncComponent(() => import("./containers/Team"));
const AsyncResetPassword = asyncComponent(() => import("./containers/ResetPassword"));


export default ({ childProps }) => 
    <Switch>
      <Route 
        exact 
        path="/"
        component={AsyncLanding}
        props={childProps} />
      <Route 
        exact 
        path="/discover"
        component={AsyncDiscover}
        props={childProps}
      />
      <Route 
        exact 
        path="/project/:readableUrl"
        component={AsyncProject}
        props={childProps}
      />
      <Route 
        exact 
        path="/about"
        component={AsyncAbout}
        props={childProps}
      />
      <Route 
        exact 
        path="/team"
        component={AsyncTeam}
        props={childProps}
      />
      <UnauthenticatedRoute 
        exact 
        path="/login"
        component={AsyncLogin}
        props={childProps}
      />
      <UnauthenticatedRoute 
        exact 
        path="/signup"
        component={AsyncSignup}
        props={childProps}
      />
      <UnauthenticatedRoute 
        exact 
        path="/login/reset"
        component={AsyncResetPassword}
        props={childProps}
      />
      <AuthenticatedRoute 
        exact 
        path="/projects/new"
        component={AsyncCreateProject}
        props={childProps}
      />
      <AuthenticatedRoute 
        exact 
        path="/projects/edit/:id"
        component={AsyncEditProject}
        props={childProps}
      />
      <AuthenticatedRoute 
        exact 
        path="/payment"
        component={AsyncPayment}
        props={childProps}
      />
      <Redirect exact from="/dashboard" to="/dashboard/home" />
      <AuthenticatedRoute exact path="/dashboard/:page?" render={props => <Dashboard {...props} />}/>
      {/* Finally, catch all unmatched routes */}
  	  <Route>
  	    <NotFound />
  	  </Route>
    </Switch>