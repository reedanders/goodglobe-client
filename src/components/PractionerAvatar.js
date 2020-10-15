import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex'
  },
  practionerImage: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  summary: {
    flexShrink: 1
  }
}));


export default function PractionerAvatar(props) {
  const { project } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container direction="row" alignItems="center">
          <Grid item md={2} lg={1}>
            <Avatar className={classes.practionerImage} alt={project.practioner_fullname} src={project.practioner_image} />
          </Grid>
          <Grid item xs={10}>
            <Container>
            <Grid container direction="column" className={classes.summary}>
              <Grid item><Typography variant="subtitle1" component="h6">{project.practioner_fullname}</Typography></Grid>
              <Grid item><Typography variant="subtitle2" component="p">{project.practioner_profile}</Typography></Grid>
            </Grid>
            </Container>
          </Grid>
        </Grid>
        
    </div>
  );
}