import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Redirect } from 'react-router-dom';
import Markdown from 'react-markdown';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import LazyLoad from 'react-lazyload';

import PostAvatar from '../components/PostAvatar';
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
  teamContainer: {
    paddingTop: theme.spacing(5),
  },
  authorImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  coverImage: {
    objectFit: 'cover',
    width: '100%',
    height: '70vh',
  },
  coverImageMobile: {
    objectFit: 'cover',
    width: '100%',
    height: '40vh',
  },
  publishDate: {
    paddingTop: theme.spacing(1),
  },
  content: {
    paddingTop: theme.spacing(2),
  },
}));

export default function Post(props) {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const validId = parseInt(props.match.params.id);
  if (!validId) {
    return <Redirect to="/404" />;
  }

  const fetchedPost = {};

  let postExists = false;

  postlist.forEach((post, i) => {
    if (validId === post.id) {
      fetchedPost.title = post.title ? post.title : 'No title given';
      fetchedPost.date = post.date ? post.date : 'No date given';
      fetchedPost.author = post.author ? post.author : 'No author given';
      fetchedPost.content = post.content ? post.content : 'No content given';
      fetchedPost.thumbnail = post.thumbnail ? post.thumbnail : 'No thumbnail given';
      fetchedPost.cover = post.cover ? post.cover : 'No cover image given';
      fetchedPost.cover_alt = post.cover_alt ? post.cover_alt : 'No cover image given';
      postExists = true;
    }
  });

  if (postExists === false) {
    return <Redirect to="/404" />;
  }
  return (
    <div>
      <Container className={classes.header}>
        <Grid container direction="column">
          <Grid item>
            <Typography component="h3" variant="h3" color="textPrimary" gutterBottom>
              {fetchedPost.title}
            </Typography>
          </Grid>
          <Grid item>
            <LazyLoad height="70vh">
              <img
                src={fetchedPost.cover}
                alt={fetchedPost.cover_alt}
                className={!matches ? classes.coverImageMobile : classes.coverImage}
              />
            </LazyLoad>
          </Grid>
          <Grid item>
            <Typography variant="caption" color="textPrimary" gutterBottom>
              {fetchedPost.cover_alt}
            </Typography>
          </Grid>
        </Grid>

        <Grid container>
          <Grid item lg={3}></Grid>
          <Grid container item lg={6}>
            <Grid item>
              <PostAvatar fetchedPost={fetchedPost} />
            </Grid>
            <Grid item>
              <Typography>
                <Markdown source={fetchedPost.content} escapeHtml={false} />
              </Typography>
            </Grid>
          </Grid>
          <Grid item lg={3}></Grid>
        </Grid>
      </Container>
    </div>
  );
}
