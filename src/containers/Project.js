import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { NavLink } from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';

import { 
  Grid, Typography, Container, Button, Paper, LinearProgress
  } 
  from '@material-ui/core';

import ProjectStepper from './ProjectStepper';
import ProgressFunding from './ProgressFunding';
import PersonCard from './PersonCard';

import Image from 'material-ui-image'

 const useStyles = makeStyles((theme) => ({
 	donateButtons : {
      margin: theme.spacing(1),
    },
    progressTemp : {
      width: '100%',
      margin: theme.spacing(2),
    },

}));

 export default function Landing() {
	const classes = useStyles();

	return (
    <div className="Landing">
    	<Paper>
    	<Grid container>
    		<Grid container item direction="row" >
    			<Grid item md={6}>
    				<Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
    					Project Name
    				</Typography>
    				<Typography component="p" variant="body1" align="left" color="textPrimary" gutterBottom>
		      		Project pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch 
		      		pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch 
		      		pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch pitch 
		      		</Typography>
    			</Grid>
    			<Grid item md={6}>
    				<Image aspectRatio="1.5" src='https://source.unsplash.com/random' />
    			</Grid>
    		</Grid>
    	</Grid>
    	<Grid container>
    		<Grid container item direction="row" alignItems="flex-end">
    			<Grid container item md={6} spacing={2} justify="center">
    				<Button className={classes.donateButtons}  variant="contained" color="primary">Primary</Button>
    				<Button className={classes.donateButtons}  variant="contained" color="primary">Primary</Button>
    				<Button className={classes.donateButtons} variant="contained" color="primary">Primary</Button>
    				<Button className={classes.donateButtons}  variant="contained" color="primary">Primary</Button>
    				<Button className={classes.donateButtons}  variant="contained" color="primary">Primary</Button>
    				<Button className={classes.donateButtons}  variant="contained" color="primary">Primary</Button>
    			</Grid>
    			<Grid item md={6}>
    				<ProgressFunding/>
    			</Grid>
    		</Grid>
    	</Grid>
    	</Paper>
    	<Grid container>
    		<Grid container item md={3} direction="column" spacing={2}>
    			<Grid item><PersonCard/></Grid>
    			<Grid item><PersonCard/></Grid>
    			<Grid item><PersonCard/></Grid>
    		</Grid>
    		<Grid container item md={9} direction="column">
    			<Grid item>
    			<Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
					Background
				</Typography>
				</Grid>
				<Grid item>
				<Typography component="p" variant="body1" align="left" color="textPrimary" gutterBottom>
	      		In Estonia, half of the mainland territory is covered by forests and about one fourth 
	      		is covered by agricultural land. About half of the protected EU habitats and species in Estonia, 
	      		based on the last Article 17 report of the Habitats Directive, are considered to be in 
	      		favourable conservation status. With regards to bird species, in the EU, almost 50% of 
	      		grassland-related bird species are declining or are in unfavourable status, and the situation 
	      		is the same in Estonia. The assessments also show a declining number of pollinators. 
	      		The main pressures and threats to forest and farmland species and habitats have been changing 
	      		forestry and agricultural practices, the decline of traditional and extensive land-use, 
	      		climate change, changes to natural hydrological regimes, and urbanisation. More and more 
	      		people have moved to the bigger cities and rural areas are sparsely populated, mainly by 
	      		elderly people who are relatively inactive. Farmlands are used by bigger companies or 
	      		farmers who are using large areas for growing monocultures that are managed intensively 
	      		with the goal of making as much profit as possible. Small farming is not so popular and 
	      		necessary any more. </Typography>
	      		</Grid>
	      		<Grid item>
	      		<Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
					Objectives
				</Typography>
				</Grid>
				<Grid item>
    			<ProjectStepper/>
    			</Grid>
    		</Grid>
    	</Grid>
    </div>
  );
}