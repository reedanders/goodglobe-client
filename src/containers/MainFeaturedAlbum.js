import React, { useState, useEffect } from 'react';
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProgressFunding from './ProgressFunding';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight:"65vh"
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  cardActions: {
    flexGrow: 1,
    padding: 0
  },
  cardActionGrid: {
    padding: theme.spacing(2)
  },
  cardHeaderSubtitle: {
    fontWeight: 700,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const cards = [1, 2, 3];

export default function MainFeaturedAlbum() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {

      try {
        const projects = await loadProjects();
        if (projects) {
          setProjects(projects.slice(0, 3));
        }
      } catch (e) {
        console.log(e);
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, []);

  function loadProjects() {
    return API.get("goodglobe", "/projects");
  };

  function setProgressValue(current, target) {
    return (100*(current/target));
  };

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Typography component="h2" variant="h4" align="center" color="textPrimary" gutterBottom>Just Launched</Typography>
      {isLoading ? <Grid container justify="center" alignItems="center"><Grid item><CircularProgress /></Grid></Grid> : ''}
      <Grid container spacing={4}>
        {projects.map((project) => (
          <Grid item key={project.projectId} xs={12} sm={6} md={4}>
            <Card className={classes.card}>
              <CardActionArea href={`/project/${project.projectId}`}>
              <CardMedia
                className={classes.cardMedia}
                image={project.attachment}
                title="Image title"
              />
              <CardContent className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {project.title}
                </Typography>
              </CardContent>
              <CardActions className={classes.cardActions}>
                <Grid container className={classes.cardActionGrid} direction="column">
                  <Grid item>
                  <Typography className={classes.cardHeaderSubtitle} gutterBottom variant="subtitle1" component="h2">
                    EUR {numberWithCommas(project.current_funding)}<Typography variant="caption"> raised of EUR {numberWithCommas(project.target_funding)} goal</Typography>
                  </Typography></Grid>
                  <Grid item><ProgressFunding value={setProgressValue(project.current_funding, project.target_funding)}/></Grid>
                </Grid>
              </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
