import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import MainQuickAboutAlbum from './MainQuickAboutAlbum';

const useStyles = makeStyles((theme) => ({
}));

export default function MainQuickAbout() {
	const classes = useStyles();

	return (
        <div>
          <Container>
            <Typography component="h2" variant="h4" align="center" color="textPrimary">
              How does GoodGlobe work?
            </Typography>
            <MainQuickAboutAlbum/>
            <div>
              <Grid container item spacing={0} justify="center">
                  <Button variant="contained" color="primary">
                    Learn more
                  </Button>
              </Grid>
            </div>
          </Container>
        </div>
		);
}