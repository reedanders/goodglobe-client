import React, { useState, useEffect } from 'react';
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import ProjectCard from './ProjectCard';

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(8),
    minHeight: "50vh"
  },
  cardCarousel: {
    padding: theme.spacing(1)
  }
}));

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    slidesToSlide: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
    slidesToSlide: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

export default function MainFeaturedAlbum() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {

      try {
        const projects = await loadProjects();
        if (projects) {
          setProjects(projects.slice(0, 8));
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
      <Carousel 
      itemClass={classes.cardCarousel}
      responsive={responsive}>
        {projects.map((project) => (
          <ProjectCard className={classes.cardCarousel} project={project}/>
        ))}
      </Carousel>
    </Container>
  );
}
