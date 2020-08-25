import React, { useState, useEffect } from 'react';
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProjectCard from './ProjectCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    minHeight:"65vh"
  },
}));

export default function MainFeaturedAlbum() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {

      try {
        const projects = await loadProjects();
        if (projects) {
          setProjects(projects.slice(0, 4));
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

  return (
    <Container className={classes.cardGrid} maxWidth="lg">
      <Typography component="h3" variant="h5" align="left" color="textPrimary" gutterBottom>Popular Projects</Typography>
      {isLoading ? <Grid container justify="center" alignItems="center"><Grid item><CircularProgress /></Grid></Grid> : ''}
      <Grid container spacing={2}>
        {projects.map((project) => (
          <Grid item key={project.projectId} xs={12} sm={6} md={3}>
            <ProjectCard project={project}/>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
