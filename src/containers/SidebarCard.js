import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';

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
  }
}));

export default function MediaCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>

	    <CardContent align="center" className={classes.cardHeader}>
	      <Typography gutterBottom className={classes.cardHeaderSubtitle} variant="subtitle1" component="h2">
	        EUR 1,628 <Typography variant="caption"> raised of EUR 2,900 goal</Typography>
	      </Typography>
	      <ProgressFunding/>    
	    </CardContent>
	    <CardContent>
	      <Typography gutterBottom variant="h6" component="h6">
	        Pracitioners
	      </Typography>
	      <Grid container direction="column" spacing={1}>
	      	<Grid item><Avatar alt="Emy Sharp" src="/static/images/avatar/1.jpg" /></Grid>
	      	<Grid item><Avatar alt="My Sharp" src="/static/images/avatar/1.jpg" /></Grid>
	      	<Grid item><Avatar alt="Harp" src="/static/images/avatar/1.jpg" /></Grid>
	      </Grid>
	    </CardContent>
	    <CardContent>
	      <Typography gutterBottom variant="h6" component="h6">
	        Themes
	      </Typography>
	      <Grid container direction="column" alignItems="center" spacing={1}>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Biodiversity
		      	</Typography>
	      		<ButtonGroup size="small" aria-label="outlined primary button group">
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    	<Button></Button>
			    	<Button></Button>
			    </ButtonGroup>
	      	</Grid>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Culture
		      	</Typography>
	      		<ButtonGroup size="small" aria-label="outlined primary button group">
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    	<Button color="primary" variant="contained"></Button>
			    </ButtonGroup>
	      	</Grid>
	      	<Grid item>
		      	<Typography gutterBottom variant="overline" component="h6">
		        	Carbon Sink
		      	</Typography>
	      		<ButtonGroup size="small" aria-label="outlined primary button group">
			    	<Button color="primary" variant="contained"></Button>
			    	<Button></Button>
			    	<Button></Button>
			    	<Button></Button>
			    	<Button></Button>
			    </ButtonGroup>
	      	</Grid>
	      </Grid>
	    </CardContent>
      <CardActions>
        <Button variant="contained" color="primary">
          Support
        </Button>
        <Button color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}