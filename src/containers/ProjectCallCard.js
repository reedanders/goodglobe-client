import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import PersonPinCircleIcon from '@material-ui/icons/PersonPinCircle';
import EcoIcon from '@material-ui/icons/Eco';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';

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
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
  },
  supporterChip : {
    margin: theme.spacing(2)
  },
  supporterFill : {
    minHeight: '150px'
  }
}));

function isChip(value) {
  return value > 2 ? true : false;
};

export default function MediaControlCard(props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const [isCulture, setIsCulture] = useState(false);
  const [isBiodiv, setIsBiodiv] = useState(false);
  const [isCarbon, setIsCarbon] = useState(false);

  useEffect(() => {

    async function onLoad() {
      setIsCulture(isChip(props.project.theme_culture));
      setIsBiodiv(isChip(props.project.theme_biodiv));
      setIsCarbon(isChip(props.project.theme_carbon));
    }

    onLoad();
  }, []);

  return (
    <Paper className={classes.root}>
    <Grid container spacing={0}>
      <Grid container item direction="column" md={6}>
        <Grid item className={classes.detailsText}>
          <Typography component="h5" variant="h5">
            {props.project.title}
          </Typography>
        </Grid>
        <Grid item className={classes.detailsSubtext}>
          <Typography variant="subtitle1" color="textSecondary">
            {props.project.pitch}
          </Typography>
        </Grid>
        <Grid container item spacing={2} className={classes.detailsSubtext}>
          {isCulture ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              icon={<PersonPinCircleIcon />}
              label="Culture"
            /> 
          </Grid> : ""}
          <Grid item>
            {isBiodiv ?  
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              icon={<EcoIcon />}
              label="Biodiversity"
            /> : ""}
          </Grid>
          <Grid item>
            {isCarbon ?  
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              icon={<EmojiTransportationIcon />}
              label="Carbon"
            /> : ""}
          </Grid>
        </Grid>
      </Grid>

      <Grid container item className={classes.image} style={{ backgroundImage: `url(${props.project.attachment})` }} md={6} sm={12} justify="flex-end" alignItems={matches ? `flex-start` : `flex-end`}>
        <Grid item><Chip className={classes.supporterChip} variant="default" color="secondary" label="7 supporters"/></Grid>
        <Grid item className={classes.supporterFill}/>
      </Grid>
    </Grid>
    </Paper>
  );
}