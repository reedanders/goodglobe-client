import React, { useState, useEffect } from 'react';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import DiscoverButton from '../components/DiscoverButton';
import ProjectCard from '../components/ProjectCard';

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '65vh',
  },
  categoryPaper: {
    position: 'relative',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  categoryGrid: {
    padding: theme.spacing(4),
  },
  categoryMedia: {
    width: '100%',
  },
  categoryMainTitle: {
    color: theme.palette.common.black,
    paddingTop: theme.spacing(2),
  },
  categoryTitle: {
    color: theme.palette.common.black,
  },
  categoryButton: {
    margin: theme.spacing(3),
  },
  categoryFiller: {
    paddingBottom: theme.spacing(1),
    color: 'grey',
  },
  categoryFillGrid: {
    minHeight: '35vh',
  },
  media: {
    width: '100%',
  },
  customAnchor: {
    textDecoration: 'none !important',
  },
  projectCard: {
    paddingTop: theme.spacing(2),
  },
}));

const icons = [
  {
    title: 'Biodiversity',
    attribution: 'relationship by Nithinan Tatah from the Noun Project',
    name: 'theme_biodiv',
  },
  {
    title: 'Habitat',
    attribution: 'wildlife by Nithinan Tatah from the Noun Project',
    name: 'theme_habitat',
  },
  {
    title: 'Air',
    attribution: 'Air by Lars Meiertoberens from the Noun Project',
    name: 'theme_air',
  },
  {
    title: 'Waste',
    attribution: 'plastic mountain by supalerk laipawat from the Noun Project',
    name: 'theme_waste',
  },
  {
    title: 'Water',
    attribution: 'Water by Smalllike from the Noun Project',
    name: 'theme_water',
  },
  {
    title: 'Resilience',
    attribution: 'Resilience by Attilio Baghino from the Noun Project',
    name: 'theme_resilience',
  },
  {
    title: 'Mitigation',
    attribution: 'heat wave by Wichai Wi from the Noun Project',
    name: 'theme_mitigation',
  },
  {
    title: 'Awareness',
    attribution: 'adapt by Oleksandr Panasovskyi from the Noun Project',
    name: 'theme_awareness',
  },
  {
    title: 'Knowledge',
    attribution: 'Share by Adrien Coquet from the Noun Project',
    name: 'theme_knowledge',
  },
];

export default function Discover() {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      try {
        const projects = await loadProjects();
        if (projects) {
          setProjects(projects);
        }
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, []);

  function loadProjects() {
    return API.get('goodglobe', '/projects');
  }

  return (
    <div className="Discover">
      <Container maxWidth="md" className={classes.header}>
        <Grid container direction="column">
          <Grid item>
            <Typography component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
              Browse projects
            </Typography>
          </Grid>
          <Grid item>
            <Typography component="h6" variant="h6" align="left" gutterBottom>
              Environmental stewards are raising money for projects they are passonate about.
            </Typography>
          </Grid>
        </Grid>
      </Container>

      <Container className={classes.cardGrid} maxWidth="md">
        {isLoading ? (
          <Grid container justify="center" alignItems="center">
            <Grid item>
              <CircularProgress />
            </Grid>
          </Grid>
        ) : (
          ''
        )}
        <Grid container spacing={4}>
          {projects.slice(0, 9).map((project, index) => (
            <Grid item key={project.projectId} xs={12} sm={6} md={4}>
              <ProjectCard project={project} />
            </Grid>
          ))}
          {projects.length < 9 && !isLoading ? (
            <Grid
              container
              item
              xs={12}
              sm={6}
              md={4}
              direction="column"
              justify="center"
              alignItems="center"
              className={classes.categoryFillGrid}
            >
              <Grid item>
                <Typography align="center" className={classes.categoryFiller} gutterBottom>
                  We need experienced practicioners to build this community.
                </Typography>
              </Grid>
              <Grid item>
                <Button variant="contained" color="primary" href="/about">
                  Create a Project
                </Button>
              </Grid>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Container>

      <Container maxWidth="md">
        <Paper className={classes.categoryPaper}>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            className={classes.categoryMainTitle}
          >
            Browse projects by category
          </Typography>
          <Grid
            container
            spacing={1}
            direction="row"
            justify="center"
            alignItems="center"
            className={classes.categoryGrid}
          >
            {icons.map((card) => (
              <nav className={classes.categoryButton}>
                <Grid item key={card.title} className={classes.categoryButton}>
                  <DiscoverButton icon={card} />
                </Grid>
              </nav>
            ))}
          </Grid>
        </Paper>
      </Container>

      {icons.map((section) => (
        <div key={section.title} id={section.title}>
            <Container className={classes.cardGrid} maxWidth="md">
              {isLoading ? (
                <Grid container justify="center" alignItems="center">
                  <Grid item>
                    <CircularProgress />
                  </Grid>
                </Grid>
              ) : (
                <div>
                  <Typography
                    component="h2"
                    variant="h4"
                    align="left"
                    color="textPrimary"
                    gutterBottom
                  >
                    {section.title}
                  </Typography>
                  <Grid container spacing={4}>
                    {projects.slice(0, 3).map((project) =>
                      project[section.name] === true ? (
                        <Grid item key={project.projectId} xs={12} sm={6} md={4}>
                          <ProjectCard project={project} />
                        </Grid>
                      ) : (
                        ''
                      ),
                    )}
                    {projects
                      .slice(0, 3)
                      .map((project) => (project[section.name] === true).length < 3) &&
                    !isLoading ? (
                      <Grid
                        container
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        direction="column"
                        justify="center"
                        alignItems="center"
                        className={classes.categoryFillGrid}
                      >
                        <Grid item>
                          <Typography
                            align="center"
                            className={classes.categoryFiller}
                            gutterBottom
                          >
                            Help us fill in this category by starting a project!
                          </Typography>
                        </Grid>
                        <Grid item>
                          <Button variant="contained" color="primary" href="/about">
                            Create a Project
                          </Button>
                        </Grid>
                      </Grid>
                    ) : (
                      ''
                    )}
                  </Grid>
                </div>
              )}
            </Container>
        </div>
      ))}
    </div>
  );
}
