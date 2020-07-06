import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";
import "./App.css";
import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from './assets/images/logo_small.png';

import { 
  AppBar, Container, Toolbar, Typography, Link, Button,
  Grid
  } 
  from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  logo: {
    maxWidth: 160,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },

}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://www.goodglobe.org">
        GoodGlobe
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {

  const history = useHistory();
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  const classes = useStyles();

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
      <Container  maxWidth="md" fixed>
        <div className={classes.root}>
        {/* Header */}
          <AppBar position="static" color="transparent" elevation={0}>
            <Toolbar variant="dense">
              <Link href="/">
                <img src={logo} alt="green earth logo" className={classes.logo} />
              </Link>
              <Grid className={classes.title}></Grid>
              {isAuthenticated ? (
                <div>
                  <Button color="primary" variant="outlined" size="small" href="/dashboard">
                    My Account
                  </Button>
                  <Button onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div>
                  <Button href="/signup">
                    Signup
                  </Button>
                  <Button href="/login">
                    Login
                  </Button>
                </div>
              )}
            </Toolbar>
          </AppBar>
          {/* End Header */}

        <ErrorBoundary>
          <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
            <Routes />
          </AppContext.Provider>
        </ErrorBoundary>

        {/* Footer */}
        <footer className={classes.footer}>
          <Container maxWidth="sm">
            
            <Copyright />
          </Container>
        </footer>
        {/* End Footer */}
        </div>
      </Container>
    )
  );
}

export default App;