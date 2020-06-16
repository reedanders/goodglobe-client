import React, { useEffect, useState } from 'react';
import { onError } from "../libs/errorLib";
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function onLoad() {

      // const result = typeof matches === 'boolean' ? setIsLoading(false) : "";
      
    }

    onLoad();
  }, [matches]);

  return (
    <React.Fragment>
      <CssBaseline />
      {!isLoading && (
      <Container maxWidth="lg">
        <main>
          <ProjectCallCard />
          <Grid 
            container 
            spacing={2} 
            justify="space-between" 
            direction={ matches ? `row` : `column-reverse`} 
            className={classes.mainGrid}>
            <Grid item md={8}>
              <Typography variant="h6" gutterBottom>
                Here is a title
              </Typography>
              <Divider />
            </Grid>
            <Grid item md={4}>
              <SidebarCard/>
            </Grid>
          </Grid>
        </main>
      </Container>
      )}
    </React.Fragment>
  );
}
