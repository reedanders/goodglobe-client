import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    paddingTop: theme.spacing(2),
  },
  practionerImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  summary: {
    flexShrink: 1,
  },
}));

export default function PractionerAvatar(props) {
  const { fetchedPost } = props;
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container direction="row" alignItems="center" spacing={1}>
        <Grid item>
          <Avatar
            className={classes.practionerImage}
            alt={fetchedPost.author}
            src={fetchedPost.thumbnail}
          />
        </Grid>

        <Grid item>
          <Grid container direction="column" className={classes.summary}>
            <Grid item>
              <Typography variant="body1" color="textPrimary">
                By <Link href="/team">{fetchedPost.author}</Link>
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption" component="p">
                Team Post
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
