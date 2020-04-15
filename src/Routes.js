import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/Home";
import Login from "./containers/Login";
import Signup from "./containers/Signup";
import NewProject from "./containers/NewProject";
import NotFound from "./containers/NotFound";

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/signup">
        <Signup />
      </Route>
      <Route exact path="/projects/new">
        <NewProject />
      </Route>
      {/* Finally, catch all unmatched routes */}
  	  <Route>
  	    <NotFound />
  	  </Route>
    </Switch>

  );
}