import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Auth } from "aws-amplify";
import CookieConsent from "react-cookie-consent";
import { SnackbarProvider } from 'notistack';

import { AppContext } from "./libs/contextLib";
import { onError } from "./libs/errorLib";
import Routes from "./Routes";
import ErrorBoundary from "./components/ErrorBoundary";
import logo from './assets/images/logo_small.png';

import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  appbar: {
    marginBottom: theme.spacing(1),
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
  dropdown: {
    display: 'flex',
  },
  dropdownPaper: {
    marginRight: theme.spacing(2),
  },
  barAction: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main
  },
  barActionAnchor: {
    textDecoration: "none !important"
  },
  barButtons: {
    marginTop: theme.spacing(1)
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
  footerGrid: {
    paddingBottom: theme.spacing(5)
  }
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
  const classes = useStyles();
  const history = useHistory();
  const anchorRef = useRef(null);
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [user, setUser] = useState("");
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  useEffect(() => {
    onLoad();
  }, [open]);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
      const user = await Auth.currentUserInfo();
      setUser(user)
    }
    catch(e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    setIsAuthenticating(false);
  }

  async function handleLogout(event) {
    await Auth.signOut();
    userHasAuthenticated(false);
    handleClose(event)
    history.push("/login");
  }

  function handleDashRedirect(event) {
    handleClose(event)
    history.push("/dashboard");
  }

  return (
    !isAuthenticating && (
      <Container  maxWidth="xl" fixed>
        <div className={classes.root}>
        {/* Header */}
          <AppBar position="static" color="transparent" elevation={0} className={classes.appbar}>
            <Toolbar variant="dense">
              <Link href="/">
                <img src={logo} alt="green earth logo" className={classes.logo} />
              </Link>
              <Grid className={classes.title}></Grid>
              <Grid className={classes.barAction}><Button color="primary" href="/discover">Fund a Project</Button></Grid>
              {isAuthenticated ? (
                <div className={classes.dropdown}>
                  <Button
                    ref={anchorRef}
                    aria-controls={open ? 'menu-list-grow' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    className={classes.barButtons}
                    variant="outlined"
                  >
                    {user ? `Hi, ${user.attributes.nickname}` : `Account` }
                  </Button>
                  <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                              <MenuItem onClick={handleDashRedirect}>My account</MenuItem>
                              <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
                </div>
              ) : (
                <div className={classes.barButtons}>
                  <Button variant="outlined" size="small" href="/signup">
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
          <SnackbarProvider maxSnack={1}>
            <Routes />
          </SnackbarProvider>
          </AppContext.Provider>
        </ErrorBoundary>

        <CookieConsent
          location="bottom"
          buttonText="Accept"
          cookieName="GoodGlobeCookieConsent"
          style={{ fontFamily: "Lato,Arial,sans-serif", background: "#2B373B" }}
          buttonStyle={{ backgroundColor: "#CCC5E8", fontFamily: "Lato,Arial,sans-serif", fontSize: "13px" }}
          expires={150}
        >
          This website uses cookies to enhance your experience.{" "}
        </CookieConsent>

        {/* Footer */}
        <footer className={classes.footer}>
          <Container maxWidth="md">
            <Grid container spacing={2} className={classes.footerGrid}>
              <Grid container item sm={6} direction="column">
                <Grid item><Typography variant="subtitle1" gutterBottom>GoodGlobe</Typography></Grid>
                <Grid item><Typography variant="subtitle2">Help us build a simple, efficient process for experienced conservation practitioners to get grassroots funding.</Typography></Grid>
              </Grid>
              <Grid container item sm={3} direction="column">
                <Grid item><Typography variant="overline" gutterBottom>About GoodGlobe</Typography></Grid>
                <Grid item><Link variant="subtitle2" href="/about">About us</Link></Grid>
              </Grid>
              <Grid container item sm={3} direction="column">
                <Grid item><Typography variant="overline" gutterBottom>Projects</Typography></Grid>
                <Grid item><Link variant="subtitle2" href="/dashboard">Start a Project</Link></Grid>
                <Grid item><Link variant="subtitle2" href="/discover">Fund a Project</Link></Grid>
              </Grid>
            </Grid>
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