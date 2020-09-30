import React, {useState, useEffect} from 'react';
import { Auth } from "aws-amplify";
import { onError } from "../libs/errorLib";


import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';

import DashboardTable from '../components/DashboardTable';
import EditUser from './EditUser';
import Payment from './Payment';
import TabPanel from '../components/TabPanel';


const drawerWidth = 256;
const lightColor = 'rgba(255, 255, 255, 0.7)';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  app: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  footer: {
    padding: theme.spacing(2),
    background: '#eaeff1',
  },
  primaryBar: {
    zIndex: 0,
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1)
  },
  secondaryBar: {
    zIndex: 0,
  },
  menuButton: {
    marginLeft: -theme.spacing(1),
  },
  iconButtonAvatar: {
    padding: 4,
  },
  link: {
    textDecoration: 'none',
    color: lightColor,
    '&:hover': {
      color: theme.palette.common.white,
    },
  },
  button: {
    borderColor: lightColor,
  },
  main: {
    flex: 1,
    padding: theme.spacing(6, 4),
    background: '#eaeff1',
  },
  avatar: {
    backgroundColor: 'white',
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  
  // Tab router utils
  const { match, history } = props;
  const { params } = match;
  const { page } = params;
  const tabNameToIndex = {
    0: "home",
    1: "profile",
    2: "settings"
  }
  const indexToTabName = {
    home: 0,
    profile: 1,
    settings: 2
  }

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
  const [user, setUser] = useState("");

  useEffect(() => {

    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        setUser(user)
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  function a11yProps(index) {
    return {
      id: `my-account-tab-tab-${index}`,
      'aria-controls': `my-account-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    history.push(`/dashboard/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  return (
      <div className={classes.root}>
        <CssBaseline />
        <div className={classes.app}>
          <AppBar
            component="div"
            className={classes.primaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Toolbar>
              <Grid container alignItems="center" spacing={1}>
                <Grid item><Avatar className={classes.avatar} alt={user && user.attributes.name} src={user && user.attributes.picture} /></Grid>
                <Grid item xs>
                  <Typography color="inherit" variant="h5" component="h1">
                    {user ? `Hi, ${user.attributes.name}` : `Welcome Back` }
                  </Typography>
                </Grid>
                <Grid item>
                  <Tooltip title="Help">
                    <IconButton href="mailto:ingmar.staude@idiv.de" color="inherit">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                </Grid>
              </Grid>
            </Toolbar>
          </AppBar>
          <AppBar
            component="div"
            className={classes.secondaryBar}
            color="primary"
            position="static"
            elevation={0}
          >
            <Tabs value={selectedTab} textColor="inherit" onChange={handleChange} aria-label="my account tabs">
              <Tab textColor="inherit" label="Home" {...a11yProps(0)}/>
              <Tab textColor="inherit" label="Profile" {...a11yProps(1)}/>
              <Tab textColor="inherit" label="Settings" {...a11yProps(2)}/>
            </Tabs>
          </AppBar>
          <TabPanel value={selectedTab} index={0}>
            <main className={classes.main}>
              <DashboardTable user={user}/>
            </main>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <main className={classes.main}>
              <EditUser/>
            </main>
          </TabPanel>
          <TabPanel value={selectedTab} index={2}>
            <main className={classes.main}>
              <Payment />
            </main>
          </TabPanel>
        </div>
      </div>
  );
}
