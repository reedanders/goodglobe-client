import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { LazyLoadImage } from 'react-lazy-load-image-component';


const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(4)
  },
  cover: {
    objectFit: "cover",
    width: 230,
    height: 230,
    borderRadius: 5,
    paddingRight: theme.spacing(2)
  },
}));

export default function PostListCard(props) {
  const { post } = props;
  const classes = useStyles();

  return (
    <ButtonBase href={`/post/${post.id}`} className={classes.root}>

        <Grid container direction="row">

          <Grid items>
            <LazyLoadImage src={post.cover} alt="The endangered wolverine." className={classes.cover}/>
          </Grid>

          <Grid items>
              <Grid container direction="column" justify="center">
                <Grid items><Typography variant="h6" component="h6">{post.title}</Typography></Grid>
              </Grid>
              
          </Grid>

        </Grid>

    </ButtonBase>
  );
}
