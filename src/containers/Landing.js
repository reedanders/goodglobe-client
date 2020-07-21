import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import MainFeaturedProject from './MainFeaturedProject';
import MainQuickAbout from './MainQuickAbout';
import MainFeaturedAlbum from './MainFeaturedAlbum';

import featured_image from "../assets/images/featured_image.jpg"
import idea_plant from "../assets/images/drawings/idea_plant.png"

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  media: {
    width: '100%',
  },
}));

const mainFeaturedProject = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: `url(${featured_image})`,
  imgText: 'main image description',
  linkText: 'Continue reading…',
};

export default function Landing() {
	const classes = useStyles();

	return (
    <div className="Landing">
      <MainFeaturedProject post={mainFeaturedProject} />
      <MainQuickAbout/>
      <MainFeaturedAlbum/>

      <Container maxWidth="md" className={classes.cardGrid}>
	      <Grid container direction="column" alignItems='center'>
	      	<Grid item>
	      		<Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>
	      		Grassroots Funding for Conservation
	      		</Typography>
	      	</Grid>
	      	<Grid item>
	      		<Typography component="p" variant="body1" align="center" gutterBottom>
	      		We are creating a community of environmental stewards and a platform on which messages 
	      		and ideas can spread around the world. To make nature conservation initiatives more 
	      		sustainable and efficient scientists review project proposals and transfers knowledge as needed.
	      		</Typography>
	      	</Grid>
	      </Grid>
      </Container>

      <Container maxWidth="md" className={classes.cardGrid}>
	      <Grid container>
	      	<Grid item container md={7} direction="column" justify="center">
	      		<Grid item>
	      			<Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
		      		Help us build 
		      		</Typography>
	      		</Grid>
	      		<Grid item>
	      			<Typography component="p" variant="body1" align="left" color="textPrimary" gutterBottom>
		      		Let's get you started! We're building a simple, efficient process for experienced 
		      		conservation practitioners to get funding for conservation projects. Here's how it works.
		      		</Typography>
	      		</Grid>
	      		<Grid item>
		      		<Button href="/dashboard" size="small" color="primary">
			          Start a Project!
			        </Button>
			        <Button href="/about" size="small">
			          Learn more
			        </Button>
		        </Grid>
	      	</Grid>
	      	<Grid item md={5}>
	      		<img src={idea_plant} alt="idea watering plant" className={classes.media}/>
	      	</Grid>
	      </Grid>
      </Container>

    </div>
  );
}