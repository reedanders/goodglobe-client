import React, { useState, useEffect } from 'react';
import { useAppContext } from '../libs/contextLib';
import { onError } from '../libs/errorLib';
import { API } from 'aws-amplify';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

import Title from './Title';

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
}));

export default function DashboardTable(props) {
  const classes = useStyles();
  const [projects, setProjects] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {
      if (!isAuthenticated) {
        return;
      }

      try {
        const projects = await loadProjects();
        setProjects(projects);
      } catch (e) {
        onError(e);
      }

      setIsLoading(false);
    }

    onLoad();
  }, [isAuthenticated]);

  function loadProjects() {
    return API.get('goodglobe', '/projects/user');
  }

  function renderCreate() {
    return (
      <Paper className={classes.paper}>
        <Title>Start a Project</Title>
        <Grid container spacing={2}>
          <Grid item>
            <Typography variant="body1" component="p">
              Get started creating a project as a early user of GoodGlobe. After creating a project,
              you can you'll be able to edit it content in this dashboard. Please contact Ingmar
              with questions and features you'd like us to add.
            </Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" size="small" href="/projects/new">
              Create
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }

  function renderTable() {
    return (
      <Paper className={classes.paper}>
        <Title>Existing Projects</Title>
        {projects.length !== 0 ? (
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography variant="overline" component="h6">
                    Project
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="overline" component="h6">
                    Summary
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="overline" component="h6"></Typography>
                </TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((row) => (
                <TableRow key={row.projectId}>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.pitch}</TableCell>
                  <TableCell>
                    {row.is_public ? (
                      <Button
                        variant="outlined"
                        color="secondary"
                        size="small"
                        href={`/project/${row.readable_url}`}
                      >
                        Public
                      </Button>
                    ) : (
                      <Button disabled size="small">
                        Private
                      </Button>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Button
                      variant="contained"
                      color="secondary"
                      size="small"
                      href={`/projects/edit/${row.projectId}`}
                    >
                      Edit
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div>
            <Grid container justify="center" alignItems="center">
              <Grid item>
                <Typography variant="subtitle1" component="h2">
                  {' '}
                  No recent project information
                </Typography>
              </Grid>
            </Grid>
          </div>
        )}
      </Paper>
    );
  }

  function renderPapers() {
    return (
      <div>
        {renderCreate()}
        {renderTable()}
      </div>
    );
  }

  function waitLoading() {
    return (
      <Grid container justify="center">
        <CircularProgress />
      </Grid>
    );
  }

  return <div className="DashboardTable">{isLoading ? waitLoading() : renderPapers()}</div>;
}
