import React from 'react';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import MainQuickAboutAlbum from './MainQuickAboutAlbum';

export default function MainQuickAbout() {

	return (
        <div>
          <Container>
            <MainQuickAboutAlbum/>
            <div>
              <Grid container item spacing={0} justify="center">
                  <Button variant="contained" size="large" color="primary" href="/about">
                    See how it works
                  </Button>
              </Grid>
            </div>
          </Container>
        </div>
		);
}