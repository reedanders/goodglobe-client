import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import human_knot from '../assets/images/drawings/human_knot_SMALL.png';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(12),
    paddingBottom: theme.spacing(4),
  },
  image: {
  	padding: theme.spacing(8)
  }
}));


export default function NotFound() {

	const classes = useStyles();

	return (
	<div className={classes.root}>
	  <Grid container
	  		direction="column"
	  		justify="center"
	  		alignItems="center">
	  	<Grid item className={classes.image}>
	  		<LazyLoadImage src={human_knot} alt="Tangled human 404" height="254"/>
	  	</Grid>
	  	<Grid item>
	  		<Typography variant="h6" align="center">Hmmmmm! Looks like the page you are looking for does not exist.</Typography>
	  	</Grid>
	  </Grid>
	</div>
	);
}