import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import MainQuickAboutAlbum from './MainQuickAboutAlbum';

export default function MainQuickAbout() {

	return (
        <div>
          <Container>
            <Typography component="h2" variant="h4" align="center" color="textPrimary">
              How does GoodGlobe work?
            </Typography>
            <MainQuickAboutAlbum/>
            <div>
              <Grid container item spacing={0} justify="center">
                  <Button variant="contained" color="primary" href="/about">
                    Learn more
                  </Button>
              </Grid>
            </div>
          </Container>
        </div>
		);
}