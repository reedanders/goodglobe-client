import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import AboutStepper from './AboutStepper';
import ideaPlant from '../assets/images/drawings/idea_plant.png';
import needsDiagram from '../assets/images/needs_diagram.png';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  aboutImage: {
    width: '100%'
  },
  stepperPaper: {
    position: 'relative',
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  stepperTitle: {
    paddingTop: theme.spacing(2)
  },
  content: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  }
}));


export default function About() {
	const classes = useStyles();

	return (
    <div className="Discover">

      <Container maxWidth="md" className={classes.header}>
	      <Grid container direction="row">
	      	<Grid container item direction="column" justify="center"spacing={2} md={6}>
            <Grid item>
  	      		<Typography component="h4" variant="h4" align="left" color="textPrimary" gutterBottom>
  	      		About GoodGlobe
  	      		</Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6" align="left" color="textPrimary" gutterBottom>
              Help us build a simple, efficient process for experienced conservation practitioners to get grassroots funding.
              </Typography>
            </Grid>
	      	</Grid>
          <Grid item md={6}>
            <img src={ideaPlant} alt="idea watering plant" className={classes.aboutImage} />
          </Grid>
	      </Grid>
      </Container>

      <Paper className={classes.stepperPaper}>
        <Grid container item alignItems="center" justify="center" className={classes.stepperTitle}>
          <Typography variant="h6" component="h6" align="left" color="textPrimary">How to Submit a Project</Typography>
        </Grid>
        <AboutStepper/>
      </Paper>

      <Container maxWidth="md" className={classes.content}>
        <Grid container direction="row">
          <Grid container item direction="column" justify="center" spacing={2}>
            <Grid item>
              <Typography component="h4" variant="h4" align="center" color="textPrimary" gutterBottom>
              Science-Driven Conservation
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6" align="left" gutterBottom>
              <p>Is there are need for GoodGlobe? In the below graphic we outline a few of our motivations. One benefit we see in this platform 
              is <i>fast</i> planning and action. Another need we hope to address is more discussion between people observing in the field and people 
              observing through data, which is somewhere in the <i>knowledge</i> and <i>community</i> bubbles. 
              While this is just a sketch, we'd like to hear why you think GoodGlobe is (or isn't) needed in conservation.</p>
              </Typography>
            </Grid>
            <Grid item>
              <img src={needsDiagram} alt="network showing interactions in conservation" className={classes.aboutImage}/>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6" align="left" gutterBottom>
              <p>There is a balance we will need to strike between the power of the internet and quality. We would require that practitioners have a professor or expert with track-record as collaborator in the project start. 
              Drafted projects would be reviewed by conservation scientists and accepted before we put them online.</p>
              </Typography>
            </Grid>
            <Grid item>
              <Typography component="h6" variant="h6" align="center" gutterBottom>
              <p>As always, please contact Ingmar if you have any questions.</p>
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Container>

    </div>
  );
}