import React from "react"
import { makeStyles } from '@material-ui/core/styles';
import { Link }  from "react-router-dom"
import Markdown from "react-markdown"

import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

import postlist from "../posts.json"

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(4)
    },
    card: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    },
    authorImage: {
      width: theme.spacing(4),
      height: theme.spacing(4),
    }
}));

export default function PostList() {
    const classes = useStyles();

    const excerptList = postlist.map(post => {
        return post.content.split(" ").slice(0, 20).join(" ") + "..."
    })

    return (
        <div className={classes.root}>
            {postlist.length ? 
                postlist.map((post, i) => {
                    return (
                        <Container key={i} className={classes.card}>
                            <Grid items>
                                <Typography variant="h6" component="h6">
                                    <Link className="links" to={`/post/${post.id}`}>{post.title}</Link>
                                </Typography>
                            </Grid>
                            <Grid items>
                                <Typography variant="caption">Published on {post.date} by {post.author}</Typography>
                            </Grid>
                            <hr/>
                            <Markdown source={excerptList[i]} escapeHtml={false} />
                            <small><Link className="links" to={`/post/${post.id}`}>Read more</Link></small>
                        </Container>
                    )
                }) : <Typography component="h6" variant="h6" align="center" color="textPrimary" gutterBottom>
                      Check back soon for blog posts on Goodglobe.
                    </Typography>
            }
        </div>
    );
}