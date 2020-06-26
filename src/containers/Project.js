import React, { useEffect, useState } from 'react';
import { onError } from "../libs/errorLib";
import { useParams, useHistory } from "react-router-dom";
import { API, Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import ProjectCallCard from './ProjectCallCard';
import ProjectStepper from './ProjectStepper';
import SidebarCard from './SidebarCard';

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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    function loadProject() {
      return API.get("goodglobe", `/projects/view/${id}`, {
        'body': { "projectId" : id }
      });
    }

    async function onLoad() {
      try {
        const project = await loadProject();
        setProject(project);
        const result = typeof matches === 'boolean' ? setIsLoading(false) : "";
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);

  return (
    <React.Fragment>
      <CssBaseline />
      {project && (
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
