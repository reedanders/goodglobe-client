import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  pos: {
    marginBottom: 12,
  },
  cardRight: {
    paddingTop: theme.spacing(1),
  },
}));

export default function MainFeatureCard() {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container>
          <Grid item>
            {matches ? (
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Science-Driven Crowdfunding
                </Typography>
                <Typography variant="body1" component="p" color="textSecondary">
                  We're building a simple, efficient process for experienced conservation
                  practitioners to get funding for conservation projects.
                </Typography>
              </div>
            ) : (
              <div>
                <Typography gutterBottom variant="h5" component="h2">
                  Science-Driven
                </Typography>
                <Typography variant="body1" component="p" color="textSecondary">
                  Crowdfunding projects sustaining our planet for future generations.
                </Typography>
              </div>
            )}
          </Grid>
          <Grid container item justify="flex-end" className={classes.cardRight}>
            <Button href="/discover" variant="contained" color="secondary" size="medium">
              Explore projects
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
