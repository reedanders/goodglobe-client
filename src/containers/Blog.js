import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';

import PostCard from '../components/PostCard';
import postlist from '../posts.json';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    width: '164px',
    marginBottom: theme.spacing(1),
  },
  postlist: {
    paddingTop: theme.spacing(5),
  },
}));

export default function Blog() {
  const classes = useStyles();

  return (
    <div>
      <Container className={classes.header}>
        <Grid container direction="column" justify="center" alignItems="center">
          <Grid item>
            <Typography component="h5" variant="h5" align="center" color="textPrimary" gutterBottom>
              Updates about GoodGlobe
            </Typography>
          </Grid>
          <Grid item>
            <Divider variant="middle" className={classes.divider} />
          </Grid>
        </Grid>
        <div className={classes.postlist}>
          {postlist.length && postlist.map((post, index) => <PostCard key={index} post={post} />)}
        </div>
      </Container>
    </div>
  );
}
