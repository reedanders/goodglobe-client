import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import "./App.css";
import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from './assets/images/logo_full.png'

import { 
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarToggler, MDBCollapse, 
  MDBNavItem, MDBNavLink, MDBContainer, MDBView, MDBMask 
} from 'mdbreact';


function App() {

  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout() {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  }

  return (
    !isAuthenticating && (
      <div className="App">
        <header>
          <MDBNavbar color="black" fixed="top" dark expand="md">
            <MDBContainer>
              <MDBNavbarBrand href="/">
                <strong>Navbar</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler />
              <MDBCollapse navbar>
                <MDBNavbarNav right>
                  <MDBNavItem active>
                    <MDBNavLink to="settings">Settings</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                    <MDBNavLink to="#">Sign Out</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBContainer>
          </MDBNavbar>
        </header>
          <MDBContainer className="mt-5 pt-5">
            <ErrorBoundary>
              <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Routes />
              </AppContext.Provider>
            </ErrorBoundary>
          </MDBContainer>
      </div>
    )
  );
}

export default App;