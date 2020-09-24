import React, { useEffect, useState, lazy, Suspense } from 'react';
import { onError } from "../libs/errorLib";
import { useParams } from "react-router-dom";
import { API } from "aws-amplify";

import DocumentMeta from 'react-document-meta';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import SidebarCard from './SidebarCard';
import ObjectiveStepper from './ObjectiveStepper';

const ProjectCallCard = lazy(() => import('./ProjectCallCard'));

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  projectCallCardLoading: {
    height: '50vh'
  }
}));

export default function Blog() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const { readableUrl } = useParams();
  const [project, setProject] = useState(null);
  const [meta, setMeta] = useState({})
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadProject() {
      return API.get("goodglobe", `/projects/view/${readableUrl}`, {
        'body': { "projectId" : readableUrl }
      });
    };

    function checkLoading() {
      return typeof matches === 'boolean' ? setIsLoading(false) : "";
    };

    function writeMeta(project) {
       return {
                title: `GoodGlobe | ${project.title}`,
                description: project.pitch,
                canonical: `http://goodglobe.org/project/${project.readable_url}`,
                meta: {
                  property: "og:image",
                  content: project.attachment
                }
              }
      };

    async function onLoad() {
      try {
        const project = await loadProject();
        setProject(project);
        setMeta(writeMeta(project));
        checkLoading()
      } catch (e) {
        onError(e);
      }
    };

    onLoad();
  }, [readableUrl, matches, project]);

  return (
    <DocumentMeta {...meta}>
      <CssBaseline />
      {!isLoading && project && (
      <Container maxWidth="lg">
        <main>
          <Suspense fallback = {<div className={classes.projectCallCardLoading}></div>} >
              <ProjectCallCard project={project}/>
          </Suspense>
          <Container>
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
                <ObjectiveStepper project={project}/>
              </Grid>
              <Grid item md={4}>
                <SidebarCard project={project}/>
              </Grid>
            </Grid>
          </Container>
        </main>
      </Container>
      )}
    </DocumentMeta>
  );
}
