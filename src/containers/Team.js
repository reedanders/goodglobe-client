import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import reed_profile from '../assets/images/team/reed_profile.png';
import ingmar_profile from '../assets/images/team/ingmar_profile.png';
import roxanne_profile from '../assets/images/team/roxanne_profile.png';

import TeamCard from '../components/TeamCard';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    width: '164px',
    marginBottom: theme.spacing(1)
  },
  teamContainer: {
    paddingTop: theme.spacing(5)
  }
}));

const team = [

  { name: "Ingmar Staude",
    position: "Lead Product Manager",
    website: "https://scholar.google.com/citations?user=K1SF44kAAAAJ&hl=en",
    linkedin: "",
    image: ingmar_profile
  },
  { name: "Reed Anderson", 
    position: "Lead Developer",
    website: "",
    linkedin: "https://www.linkedin.com/in/reed-anders/",
    image: reed_profile
  },
  { name: "Roxanne Leberger, PhD",
    position: "Project Development",
    website: "https://scholar.google.com/scholar?hl=en&as_sdt=0%2C23&q=%22R+Leberger%22&btnG=",
    linkedin: "",
    image: roxanne_profile
  },

  ]

export default function Team() {
	const classes = useStyles();

	return (
    <div>

      <Container className={classes.header}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item container direction="column" justify="center" alignItems="center">
            <Grid item>
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              Meet the GoodGlobe team
            </Typography>
            </Grid>
            <Grid item><Divider variant="middle" className={classes.divider}/></Grid>
            <Grid item>
            <Typography align="center" gutterBottom>
              We're building a simple, efficient process the fund the work of experienced conservation practitioners.
            </Typography>
            </Grid>
          </Grid>
          <Grid container item 
                direction="row" 
                justify="center"
                alignItems="center"
                className={classes.teamContainer}>

                {team.map((member) => (
                    <Grid item>
                    <TeamCard member={member} />
                    </Grid>
                  ))}

          </Grid>
        </Grid>
      </Container>



    </div>
  );
}