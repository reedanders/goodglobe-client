import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostPaper: {
    backgroundColor: theme.palette.common.white,
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2),
      paddingRight: 0,
    },
  },
  mainFeaturedPostTags: {
    position: 'relative',
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(2)
    },
  },
  mainFeaturedPostTag: {
    padding: theme.spacing(1),
    textAlign: "right",
  }
}));

export default function MainFeaturedPost(props) {
  const classes = useStyles();
  const { post } = props;

  return (
    <Paper elevation={1} className={classes.mainFeaturedPost} style={{ backgroundImage: `url(${post.image})` }}>
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={post.image} alt={post.imageText} />} 
      <div className={classes.overlay} />
      <Grid container>
        <Grid container item md={7}>
          <div className={classes.mainFeaturedPostContent}>
            <Card>
              <CardContent>
                <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                  {post.title}
                </Typography>
                <Typography variant="subtitle1" color="inherit" paragraph>
                  {post.description}
                </Typography>
              </CardContent>
              <CardActions>
                <Link variant="subtitle1" href="#">
                  {post.linkText}
                </Link>
              </CardActions>
            </Card>
          </div>
        </Grid>
        <Grid container item md={5} alignItems="flex-end" justify="flex-end">
          <div className={classes.mainFeaturedPostTags}>
            <Grid item className={classes.mainFeaturedPostTag}><Chip
              label="Increase habitat" 
              color="primary" /></Grid>
            <Grid item className={classes.mainFeaturedPostTag}><Chip
              label="Education" 
              color="primary" /></Grid>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

MainFeaturedPost.propTypes = {
  post: PropTypes.object,
};
