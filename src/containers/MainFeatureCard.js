import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import  face_thought_SMALL  from "../assets/images/drawings/face_thought_SMALL.png"

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    padding: theme.spacing(2)
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  pos: {
    marginBottom: 12
  },
  button: {
    marginTop: theme.spacing(2),
  },
  cardMedia: {
    height: 128,
    width: 128,
  },
}));

export default function MainFeatureCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item xs={7}>
            <Typography gutterBottom variant="h5" component="h2">
              Science-Driven
            </Typography>
            <Typography variant="body1" component="p" color="textSecondary">
              Help sustain our planet for future generations.
            </Typography>
            <Button href="/discover"className={classes.button} variant="outlined" color="primary" size="small">Explore projects</Button>
          </Grid>
          <Grid item>
            <img src={face_thought_SMALL} alt="Thinking face" className={classes.cardMedia}/>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
