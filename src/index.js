import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import config from './config';
import { initSentry } from './libs/errorLib';

import { createMuiTheme, ThemeProvider, withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

let theme = createMuiTheme({
  palette: {
    primary: {
      light: '#9AC39C',
      main: '#418543',
      dark: '#1B381C',
    },
    secondary: {
      light: '#CCC5E8',
      main: '#7C759C',
      dark: '#5F4DAC',
    },
  },
  typography: {
    h1: {
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    h2: {
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    h3: {
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    h4: {
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    h5: {
      fontWeight: 500,
      fontSize: 26,
      letterSpacing: 0.5,
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    h6: {
      fontFamily: [
      'Merriweather Sans',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    subtitle1: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    subtitle1: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    subtitle2: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    body1: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    body2: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    button: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    caption: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    overline: {
      fontFamily: [
      'Lato',
      'Arial',
      'sans-serif',
      ].join(',')
    },
    fontFamily: [
      'Merriweather Sans',
      '"Lato"',
      'Arial',
      'sans-serif',
      ].join(',')
  },
  shape: {
    borderRadius: 4,
  },
  props: {
    MuiTab: {
      disableRipple: true,
    },
  },
  mixins: {
    toolbar: {
      minHeight: 48,
    },
  },
});

theme = {
  ...theme,
  overrides: {
    MuiDrawer: {
      paper: {
        backgroundColor: '#18202c',
      },
    },
    MuiButton: {
      label: {
        textTransform: 'none',
      },
      contained: {
        boxShadow: 'none',
        '&:active': {
          boxShadow: 'none',
        },
      },
    },
    MuiTabs: {
      root: {
        marginLeft: theme.spacing(1),
      },
      indicator: {
        height: 3,
        borderTopLeftRadius: 3,
        borderTopRightRadius: 3,
        backgroundColor: theme.palette.common.white,
      },
    },
    MuiTab: {
      root: {
        textTransform: 'none',
        margin: '0 16px',
        minWidth: 0,
        padding: 0,
        [theme.breakpoints.up('md')]: {
          padding: 0,
          minWidth: 0,
        },
      },
    },
    MuiIconButton: {
      root: {
        padding: theme.spacing(1),
      },
    },
    MuiTooltip: {
      tooltip: {
        borderRadius: 4,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: '#404854',
      },
    },
    MuiListItemText: {
      primary: {
        fontWeight: theme.typography.fontWeightMedium,
      },
    },
    MuiListItemIcon: {
      root: {
        color: 'inherit',
        marginRight: 0,
        '& svg': {
          fontSize: 20,
        },
      },
    },
    MuiAvatar: {
      root: {
        width: 32,
        height: 32,
      },
    },
  },
};

initSentry();

Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    identityPoolId: config.cognito.IDENTITY_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  },
  Storage: {
    region: config.s3.REGION,
    bucket: config.s3.BUCKET,
    identityPoolId: config.cognito.IDENTITY_POOL_ID
  },
  API: {
    endpoints: [
      {
        name: "goodglobe",
        endpoint: config.apiGateway.URL,
        region: config.apiGateway.REGION
      },
    ]
  }
});

ReactDOM.render(
  <React.StrictMode>
   <Router>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
   </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
