import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

import LazyLoad from 'react-lazyload';
import Markdown from 'react-markdown';

import AboutStepper from '../components/AboutStepper';
import ideaPlant from '../assets/images/drawings/idea_plant.png';
import needsDiagram from '../assets/images/needs_diagram.png';

import aboutText from '../pages.json';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  aboutImage: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  networkImage: {
    objectFit: 'cover',
    width: '100%',
  },
  stepperPaper: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  stepperTitle: {
    paddingTop: theme.spacing(2),
  },
  stepperButton: {
    paddingBottom: theme.spacing(2),
  },
  content: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export default function About() {
  const classes = useStyles();

  return (
    <div className="Discover">
      <Container maxWidth="md" className={classes.header}>
        <Grid container direction="row" justify="center">
          <Grid container item direction="column" justify="center" spacing={2} md={6}>
            <Grid item>
              <Typography component="h4" variant="h4" align="left" color="textPrimary" gutterBottom>
                About GoodGlobe
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6" align="left" color="textPrimary" gutterBottom>
                Help us build a simple, efficient process for experienced conservation practitioners
                to get grassroots funding.
              </Typography>
            </Grid>
          </Grid>
          <Grid item md={6}>
            <LazyLoad height={'50px'} offset={100}>
              <img src={ideaPlant} alt="idea watering plant" className={classes.aboutImage} />
            </LazyLoad>
          </Grid>
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Paper className={classes.stepperPaper}>
          <Grid
            container
            item
            alignItems="center"
            justify="center"
            className={classes.stepperTitle}
          >
            <Typography variant="h6" component="h6" align="left" color="textPrimary">
              How to Submit a Project
            </Typography>
          </Grid>
          <AboutStepper />
          <Grid
            container
            item
            alignItems="center"
            justify="center"
            className={classes.stepperButton}
          >
            <Button variant="contained" color="primary" href="/dashboard">
              Start a Project
            </Button>
          </Grid>
        </Paper>
      </Container>

      <Container maxWidth="md" className={classes.content}>
        <Grid container direction="row">
          <Grid container item direction="column" justify="center" spacing={2}>
            <Grid item>
              <Typography
                component="h4"
                variant="h4"
                align="center"
                color="textPrimary"
                gutterBottom
              >
                Science-Driven Conservation
              </Typography>
            </Grid>
            <Grid item>
              <Typography align="left" gutterBottom>
                <Markdown source={aboutText[0].content} escapeHtml={false} />
              </Typography>
            </Grid>
            <Grid item container justify="space-between">
              <Grid item></Grid>
              <Grid item md={8}>
                <LazyLoad offset={200}>
                  <img
                    src={needsDiagram}
                    alt="network showing interactions in conservation"
                    className={classes.networkImage}
                  />
                </LazyLoad>
              </Grid>
              <Grid item></Grid>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="left" gutterBottom>
                <p>
                  There is a balance we will need to strike between the power of the internet and
                  quality. We would require that practitioners have a professor or expert with
                  track-record as collaborator in the project start. Drafted projects would be
                  reviewed by conservation scientists and accepted before we put them online.
                </p>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1" align="center" gutterBottom>
                <p>As always, please contact Ingmar if you have any questions.</p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
