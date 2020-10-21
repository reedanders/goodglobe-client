import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Redirect } from "react-router-dom"
import Markdown from "react-markdown"

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';


import postlist from "../posts.json"


const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  divider: {
    width: '164px',
    marginBottom: theme.spacing(1)
  },
  teamContainer: {
    paddingTop: theme.spacing(5)
  },
  authorImage: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  publishDate: {
    paddingTop: theme.spacing(1)
  },
  content: {
    paddingTop: theme.spacing(2)
  }
}));


export default function Post(props) {
    const classes = useStyles();

    const validId = parseInt(props.match.params.id)
    if (!validId) {
        return <Redirect to="/404" />
    }

    const fetchedPost = {}

    let postExists = false

    postlist.forEach((post, i) => {
        if (validId === post.id) {
            fetchedPost.title = post.title ? post.title : "No title given"
            fetchedPost.date = post.date ? post.date : "No date given"
            fetchedPost.author = post.author ? post.author : "No author given"
            fetchedPost.content = post.content ? post.content : "No content given"
            fetchedPost.thumbnail = post.thumbnail ? post.thumbnail : "No thumbnail given"
            postExists = true
        }
    })

    if (postExists === false) {
        return <Redirect to="/404" />
    }
    return (
        <div>
        <Container className={classes.header}>
          <Grid container justify="space-between">

          <Grid item sm={2}></Grid>

          <Grid item container direction="column" sm={8}>
            <Grid item>
            <Typography component="h4" variant="h4" color="textPrimary" gutterBottom>
              {fetchedPost.title}
            </Typography>
            </Grid>
            <Grid item container direction="row" alignItems="center" spacing={2}>
                <Grid item>
                 <Avatar className={classes.authorImage} alt={fetchedPost.author} src={fetchedPost.thumbnail} />
                </Grid>
                <Grid item><Typography variant="overline" color="textPrimary" gutterBottom>
                  {fetchedPost.author}
                </Typography></Grid>
            </Grid>
            <Grid item className={classes.content}>
            <Markdown source={fetchedPost.content} escapeHtml={false} />
            </Grid>
            <Grid item className={classes.publishDate}><Typography variant="caption" color="textPrimary" gutterBottom>
              Published on {fetchedPost.date}
            </Typography></Grid>
          </Grid>

          <Grid item sm={2}></Grid>

          </Grid>
        </Container>
        </div>
    );
}