import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

import { useSnackbar } from 'notistack';

import ProgressFunding from './ProgressFunding';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(2),
  },
  media: {
    height: 140,
  },
  cardHeader: {
  	backgroundColor: theme.palette.primary.light,
  	color: theme.palette.common.black,
  },
  cardHeaderSubtitle: {
  	fontWeight: 700,
  },
  cardButtonGrid: {
  	marginTop: theme.spacing(2),
  },
  cardButton: {
  	width: '100%',
  },
  sliderColor: {
  	color: theme.palette.primary.main,
  	height: 8,
  },
  profileOffset: {
  	paddingLeft: theme.spacing(5)
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divider:{
    margin: theme.spacing(2)
  },
  themeInfo: {
  	paddingLeft: theme.spacing(5)
  }
}));

function numberWithCommas(x) {
	if (x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	} else {return}
    
}

export default function SideBarCard(props) {
  const classes = useStyles();
  const [humanCurrent, setHumanCurrent] = useState("");
  const [humanTarget, setHumanTarget] = useState("");
  const [progressValue, setProgressValue] = useState(0);

  const [isNotify, setIsNotify] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const message = "Thanks for your interest! This is a demo website. We'll accept payments soon.";

  useEffect(() => {
    async function onLoad() {
    	setHumanTarget(numberWithCommas(props.project.target_funding));
    	setHumanCurrent(numberWithCommas(props.project.current_funding));
    	setProgressValue(100*(props.project.current_funding/props.project.target_funding));
    }

    onLoad();
  }, );

  function handleDonate () {

  	if (!isNotify) {
  		setIsNotify(true);
	  	enqueueSnackbar(message , {
	        variant: 'info',
	        anchorOrigin: {
	            vertical: 'top',
	            horizontal: 'center',
	        }
	      });
  	} else {
  		return
  	}
  };

  return (
    <Card className={classes.root}>

	    <CardContent className={classes.cardHeader} align="center">
	      <Typography className={classes.cardHeaderSubtitle} gutterBottom variant="subtitle1" component="h2">
	        EUR {humanCurrent} <Typography variant="caption"> raised of EUR {humanTarget} goal</Typography>
	      </Typography>
	      <ProgressFunding value={progressValue}/>
	      <Grid className={classes.cardButtonGrid} container spacing={2} direction="column" justify="center" alignItems="stretch">
	        <Grid item>
	        <Button className={classes.cardButton} onClick={handleDonate} variant="contained" color="secondary" size="large">
	          Donate
	        </Button>
	        </Grid>
	        <Grid container item spacing={1} justify="center" alignItems="stretch">
	        	<Grid item><Link href="https://facebook.com" target="_blank" rel="noopener noreferrer" color="inherit"><FacebookIcon/></Link></Grid>
	        	<Grid item><Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" color="inherit"><TwitterIcon/></Link></Grid>
	        	<Grid item><Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" color="inherit"><InstagramIcon/></Link></Grid>
	        </Grid>
        </Grid> 
	    </CardContent>
	    <CardContent>
	      <Typography gutterBottom variant="h6" component="h6">
	        Practioner 
	      </Typography>
	      <Grid container direction="column" spacing={1}>
	      	<Grid container item spacing={1} alignItems="center">
	      		<Grid item><Avatar className={classes.large} alt={props.project.practioner_fullname} src={props.project.practioner_image} /></Grid>
	      		<Grid item><Typography variant="subtitle1" component="h6">{props.project.practioner_fullname}</Typography>
	      		</Grid>
	      	</Grid>
	      	<Grid item>
	      		<Typography variant="subtitle2" component="p" className={classes.profileOffset}>{props.project.practioner_profile}</Typography>
	      	</Grid>
	      </Grid>
	    </CardContent>
	    <CardContent>
	      <Typography gutterBottom variant="h6" component="h6">
	        Themes addressed
	      </Typography>
	      <Grid container direction="column" spacing={1} className={classes.themeInfo}>
	      {props.project.theme_biodiv ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Biodiversity
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Biodiversity — the extraordinary variety of ecosystems, 
	      			species and genes that surround us — 
	      			giving us food, fresh water and clean air, shelter and medicine, 
	      			mitigating natural disasters, pests and diseases and 
	      			contributes to regulating the climate. 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_habitat ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Habitat
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Conservation of a wide range of rare, threatened or endemic animal and plant species, in addition to rare habitat types.
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_air ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Air
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Air is ... 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_waste ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Waste
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Waste is ... 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_water ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Water
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Water is ... 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_resilience ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Climate Resilience
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Climate resilience is ... 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_mitigation ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Climate Mitigation
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Climate mitigating is ... 
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_awareness ? 
	      	<div>
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Awareness Building
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Awareness building ...  
	      		</Typography>
	      	</Grid>
	      	<Divider className={classes.divider}/>
	      	</div>
	      	: ""}
	      	{props.project.theme_knowledge ? 
	      	<Grid item>
		      	<Typography variant="overline" component="h6">
		        	Knowledge Development
		      	</Typography>
	      		<Typography variant="subtitle2" component="p">
	      			Knowledge development is ... 
	      		</Typography>
	      	</Grid>
	      	: ""}
	      </Grid>
	    </CardContent>
    </Card>
  );
}