import React, { useEffect, useState } from 'react';
import { onError } from "../libs/errorLib";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ProjectCallCard from './ProjectCallCard';
import SidebarCard from './SidebarCard';
import ObjectiveStepper from './ObjectiveStepper';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

export default function Blog() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadProject() {
      return API.get("goodglobe", `/projects/view/${id}`, {
        'body': { "projectId" : id }
      });
    }

    function checkLoading() {
      return typeof matches === 'boolean' ? setIsLoading(false) : "";
    }

    async function onLoad() {
      try {
        const project = await loadProject();
        setProject(project);
        checkLoading()
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id, matches]);

  return (
    <React.Fragment>
      <CssBaseline />
      {!isLoading && project && (
      <Container maxWidth="lg">
        <main>
          <ProjectCallCard project={project}/>
          <Grid 
            container 
            spacing={2} 
            justify="space-between" 
            direction={ matches ? `row` : `column-reverse`} 
            className={classes.mainGrid}>
            <Grid item md={8}>
              <Typography variant="h6" gutterBottom>
                Background
              </Typography>
              <Divider />
              <Typography dangerouslySetInnerHTML={{ __html: project.content }} gutterBottom/>
              <Typography variant="h6" gutterBottom>
                Objectives
              </Typography>
              <Divider />
              <ObjectiveStepper/>
            </Grid>
            <Grid item md={4}>
              <SidebarCard project={project}/>
            </Grid>
          </Grid>
        </main>
      </Container>
      )}
    </React.Fragment>
  );
}
