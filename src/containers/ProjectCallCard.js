import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

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


export default function MediaControlCard(props) {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');

  const [isBiodiv, setIsBiodiv] = useState("");
  const [isHabitat, setIsHabitat] = useState("");
  const [isAir, setIsAir] = useState("");
  const [isWaste, setIsWaste] = useState("");
  const [isWater, setIsWater] = useState("");
  const [isResilience, setIsResilience] = useState("");
  const [isMitigation, setIsMitigation] = useState("");
  const [isAwareness, setIsAwareness] = useState("");
  const [isKnowledge, setIsKnowledge] = useState("");
  const [donors, setDonors] = useState("0");

  function fakeDonors (funding) {
    if (funding > 0) {
      return numberWithCommas(Math.round(funding/15));
    } else {
      return "0";
    }
  }

  function numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {return}
      
  }

  useEffect(() => {

    async function onLoad() {
      setIsBiodiv(props.project.theme_biodiv);
      setIsHabitat(props.project.theme_habitat);
      setIsAir(props.project.theme_air);
      setIsWaste(props.project.theme_waste);
      setIsWater(props.project.theme_water);
      setIsResilience(props.project.theme_resilience);
      setIsMitigation(props.project.theme_mitigation);
      setIsAwareness(props.project.theme_awareness);
      setIsKnowledge(props.project.theme_knowledge);
      setDonors(fakeDonors(props.project.current_funding))
    }

    onLoad();
  }, );

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

          {isBiodiv ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Biodiversity"
            /> 
          </Grid> : ""}
          {isHabitat ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Habitat"
            /> 
          </Grid> : ""}
          {isAir ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Air"
            /> 
          </Grid> : ""}
          {isWaste ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Waste"
            /> 
          </Grid> : ""}
          {isWater ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Water"
            /> 
          </Grid> : ""}
          {isResilience ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Climate Resilience"
            /> 
          </Grid> : ""}
          {isMitigation ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Climate Mitigation"
            /> 
          </Grid> : ""}
          {isAwareness ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Awareness"
            /> 
          </Grid> : ""}
          {isKnowledge ?  
          <Grid item>
            <Chip
              variant="outlined"
              size="small"
              color="primary"
              label="Knowledge"
            /> 
          </Grid> : ""}
        </Grid>
      </Grid>

      <Grid container item className={classes.image} style={{ backgroundImage: `url(${props.project.attachment})` }} md={6} sm={12} justify="flex-end" alignItems={matches ? `flex-start` : `flex-end`}>
        <Grid item><Chip className={classes.supporterChip} variant="default" color="secondary" label={`${donors} supporters`}/></Grid>
        <Grid item className={classes.supporterFill}/>
      </Grid>
    </Grid>
    </Paper>
  );
}