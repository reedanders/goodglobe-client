import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275
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
    marginBottom: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
}));

export default function MainFeatureCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          Fund Conservation Projects
        </Typography>
        <Typography variant="body1" component="p" color="textSecondary">
          Make direct contributions to conservation projects that fight
          extinction and sustain our planet for future generations.
        </Typography>
      </CardContent>
      <CardActions>
        <Button href="/discover"className={classes.button} variant="outlined" color="primary" size="small">Explore projects</Button>
      </CardActions>
    </Card>
  );
}
