import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import EcoIcon from '@material-ui/icons/Eco';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
  },
  detailsText: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingRight: theme.spacing(2),
  },
  detailsSubtext: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  detailsPlace: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
  imageSmall: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottomRightRadius: 3,
    borderBottomLeftRadius: 3,
  },
  supporterChip : {
    margin: theme.spacing(2)
  },
  supporterFill : {
    minHeight: '150px'
  }
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');

  return (
    <Paper className={classes.root}>
    <Grid container spacing={0}>
      <Grid container item direction="column" md={6}>
        <Grid item className={classes.detailsText}>
          <Typography component="h5" variant="h5">
            Community farming for protecting Natura 2000 habitats
          </Typography>
        </Grid>
        <Grid item className={classes.detailsSubtext}>
          <Typography variant="subtitle1" color="textSecondary">
            Adaptive community based management of forest and farming landscapes to improve the conservation status of Natura 2000 habitats and species.
          </Typography>
        </Grid>
        <Grid container item spacing={2} className={classes.detailsSubtext}>
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              icon={<PersonPinCircleIcon />}
              label="Culture"
            />
          </Grid>
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              icon={<EcoIcon />}
              label="Biodiversity"
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container item className={matches ? classes.image : classes.imageSmall} md={6} sm={12} justify="flex-end" alignItems={matches ? `flex-start` : `flex-end`}>
        <Grid item><Chip className={classes.supporterChip} variant="default" color="secondary" label="7 supporters"/></Grid>
        <Grid item className={classes.supporterFill}/>
      </Grid>
    </Grid>
    </Paper>
  );
}