import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import featured_image from "../assets/images/hero-background.png"

import MainFeatureCard from './MainFeatureCard';

const useStyles = makeStyles((theme) => ({
  mainFeaturedProject: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: `url(${featured_image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    height: '30vh',
  },
  mainFeaturedGrid: {
    height: '30vh'
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedProjectContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6)
    },
  },
}));

export default function MainFeaturedProject(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper className={classes.mainFeaturedProject} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />}
      <div className={classes.overlay} />
      <Grid container direction="column" justify="center" alignItems="center" className={classes.mainFeaturedGrid}>
        <Grid item></Grid>
        <Grid item md={8} lg={5} xl={4}>
          <div className={classes.mainFeaturedProjectContent}>
            <MainFeatureCard />
          </div>
        </Grid>
        <Grid item></Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedProject.propTypes = {
  post: PropTypes.object,
};