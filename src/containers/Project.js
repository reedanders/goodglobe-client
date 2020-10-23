import React, { useEffect, useState, lazy, Suspense } from 'react';
import { onError } from '../libs/errorLib';
import { useParams } from 'react-router-dom';
import { API } from 'aws-amplify';

import { Helmet } from 'react-helmet';

import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import SidebarCard from '../components/SidebarCard';
import ObjectiveStepper from '../components/ObjectiveStepper';

const ProjectCallCard = lazy(() => import('../components/ProjectCallCard'));

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  projectCallCardLoading: {
    height: '50vh',
  },
}));

export default function Project() {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:960px)');
  const { readableUrl } = useParams();
  const [project, setProject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    function loadProject() {
      return API.get('goodglobe', `/projects/view/${readableUrl}`, {
        body: { projectId: readableUrl },
      });
    }

    function checkLoading() {
      return typeof matches === 'boolean' ? setIsLoading(false) : '';
    }

    async function onLoad() {
      try {
        const project = await loadProject();
        setProject(project);
        checkLoading();
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [readableUrl, matches]);

  return (
    <React.Fragment>
      <CssBaseline />
      {!isLoading && project && (
        <Container maxWidth="lg">
          <Helmet>
            <title>GoodGlobe | {project.title}</title>
            <meta name="description" content={project.pitch} />
            <meta property="og:image" content={project.attachment} />
            <meta property="og:image:secure_url" content={project.attachment} />
          </Helmet>
          <main>
            <Suspense fallback={<div className={classes.projectCallCardLoading}></div>}>
              <ProjectCallCard project={project} />
            </Suspense>
            <Container>
              <Grid
                container
                spacing={2}
                justify="space-between"
                direction={matches ? `row` : `column-reverse`}
                className={classes.mainGrid}
              >
                <Grid item md={8}>
                  <Typography variant="h6" gutterBottom>
                    Background
                  </Typography>
                  <Divider />
                  <Typography dangerouslySetInnerHTML={{ __html: project.content }} gutterBottom />
                  <Typography variant="h6" gutterBottom>
                    Objectives
                  </Typography>
                  <Divider />
                  <ObjectiveStepper project={project} />
                </Grid>
                <Grid item md={4}>
                  <SidebarCard project={project} />
                </Grid>
              </Grid>
            </Container>
          </main>
        </Container>
      )}
    </React.Fragment>
  );
}
