import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import HelpIcon from '@material-ui/icons/Help';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import DashboardTable from './DashboardTable';
import DashboardProjects from './DashboardProjects';
import Payment from './Payment';
import NewProject from './NewProject';
import TabPanel from '../components/TabPanel';

function a11yProps(index) {
  return {
    id: `my-account-tab-tab-${index}`,
    'aria-controls': `my-account-tabpanel-${index}`,
  };
}

const lightColor = 'rgba(255, 255, 255, 0.7)';

const useStyles = makeStyles((theme) => ({

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
}));

export default function Header(props) {
  const classes = useStyles();
  const [selectedTab, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <React.Fragment>
      <AppBar
        component="div"
        className={classes.primaryBar}
        color="primary"
        position="static"
        elevation={0}
      >
        <Toolbar>
          <Grid container alignItems="center" spacing={1}>
            <Grid item><Avatar alt="Username" src="/static/images/avatar/1.jpg" /></Grid>
            <Grid item xs>
              <Typography color="inherit" variant="h5" component="h1">
                [Username]
              </Typography>
            </Grid>
            <Grid item>
              <Tooltip title="Help">
                <IconButton color="inherit">
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
          <Tab textColor="inherit" label="Projects" {...a11yProps(1)}/>
          <Tab textColor="inherit" label="Settings" {...a11yProps(2)}/>
        </Tabs>
      </AppBar>
      <TabPanel value={selectedTab} index={0}>
        <main className={classes.main}>
          <DashboardTable />
        </main>
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <main className={classes.main}>
          <DashboardProjects/>
        </main>
      </TabPanel>
      <TabPanel value={selectedTab} index={2}>
        <main className={classes.main}>
          <Payment />
        </main>
      </TabPanel>
    </React.Fragment>
  );
}
