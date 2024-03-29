import React, { lazy, Suspense } from 'react';

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import featured_image from '../assets/images/featured_image.jpg';
import idea_plant from '../assets/images/drawings/idea_plant.png';

import LazyLoad from 'react-lazyload';

const MainFeaturedProject = lazy(() => import('../components/MainFeaturedProject'));
const MainFeaturedAlbum = lazy(() => import('../components/MainFeaturedAlbum'));
const MainQuickAbout = lazy(() => import('../components/MainQuickAbout'));

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardGridColor: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    marginBottom: theme.spacing(4),
    backgroundColor: theme.palette.primary.light,
  },
  media: {
    width: '100%',
  },
  featuredLoading: {
    height: '100vh',
  },
}));

const mainFeaturedProject = {
  image: `url(${featured_image})`,
  imageText: 'collage of endangered plants and animals',
};

export default function Landing() {
  const classes = useStyles();

  return (
    <div className="Landing">
      <Suspense fallback={<div className={classes.featuredLoading}></div>}>
        <MainFeaturedProject post={mainFeaturedProject} />
        <MainFeaturedAlbum />
      </Suspense>

      <Paper className={classes.cardGridColor}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography component="h1" variant="h4" align="center" gutterBottom>
              Grassroots Funding for Conservation
            </Typography>
          </Grid>
          <Grid item container justify="space-between">
            <Grid item></Grid>
            <Grid item sm={8}>
              <Typography component="p" variant="body1" align="center" gutterBottom>
                We are creating a community of environmental stewards and a platform on which
                messages and ideas can spread around the world. To make nature conservation
                initiatives more sustainable and efficient scientists review project proposals and
                transfers knowledge as needed.
              </Typography>
            </Grid>
            <Grid item></Grid>
          </Grid>
        </Grid>
      </Paper>

      <Suspense fallback={<div></div>}>
        <MainQuickAbout />
      </Suspense>

      <Container className={classes.cardGrid}>
        <Grid container>
          <Grid item container md={7} direction="column" justify="center">
            <Grid item>
              <Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
                Help us build
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                component="p"
                variant="body1"
                align="left"
                color="textPrimary"
                gutterBottom
              >
                Let's get you started! We're building a simple, efficient process for experienced
                conservation practitioners to get funding for conservation projects. Here's how it
                works.
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
            <LazyLoad offset={100}>
              <img src={idea_plant} alt="idea watering plant" className={classes.media} />
            </LazyLoad>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
