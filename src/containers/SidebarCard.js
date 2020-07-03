import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Slider from '@material-ui/core/Slider';

import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

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

  useEffect(() => {
    async function onLoad() {
    	setHumanTarget(numberWithCommas(props.project.target_funding));
    	setHumanCurrent(numberWithCommas(props.project.current_funding));
    	setProgressValue(100*(props.project.current_funding/props.project.target_funding));
    }

    onLoad();
  }, );

  return (
    <Card className={classes.root}>

	    <CardContent className={classes.cardHeader} align="center">
	      <Typography className={classes.cardHeaderSubtitle} gutterBottom variant="subtitle1" component="h2">
	        EUR {humanCurrent} <Typography variant="caption"> raised of EUR {humanTarget} goal</Typography>
	      </Typography>
	      <ProgressFunding value={progressValue}/>
	      <Grid className={classes.cardButtonGrid} container spacing={2} direction="column" justify="center" alignItems="stretch">
	        <Grid item>
	        <Button className={classes.cardButton} variant="contained" color="secondary" size="large">
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
	        Themes
	      </Typography>
	      <Grid container direction="column" spacing={1}>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Biodiversity
		      	</Typography>
	      		<Slider className={classes.sliderColor}
			        defaultValue={props.project.theme_biodiv}
			        aria-labelledby="discrete-slider"
			        valueLabelDisplay="auto"
			        step={1}
			        min={0}
			        max={5}
			        color="primary"
			        disabled
			      />
	      	</Grid>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Culture
		      	</Typography>
	      		<Slider className={classes.sliderColor}
			        defaultValue={props.project.theme_culture}
			        aria-labelledby="discrete-slider"
			        valueLabelDisplay="auto"
			        step={1}
			        min={0}
			        max={5}
			        color="primary"
			        disabled
			      />
	      	</Grid>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Carbon Mitigation
		      	</Typography>
	      		<Slider className={classes.sliderColor}
			        defaultValue={props.project.theme_carbon}
			        aria-labelledby="discrete-slider"
			        valueLabelDisplay="auto"
			        step={1}
			        min={0}
			        max={5}
			        color="primary"
			        disabled
			      />
	      	</Grid>
	      </Grid>
	    </CardContent>
    </Card>
  );
}