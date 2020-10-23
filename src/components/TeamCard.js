import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';

import LinkedInIcon from '@material-ui/icons/LinkedIn';
import LanguageIcon from '@material-ui/icons/Language';

import { LazyLoadImage } from 'react-lazy-load-image-component';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 285,
    paddingBottom: theme.spacing(8),
  },
  image: {
    paddingBottom: theme.spacing(2),
  },
  roundedImage: {
    borderRadius: '50%',
  },
  links: {
    paddingTop: theme.spacing(1),
  },
}));

export default function TeamCard(props) {
  const classes = useStyles();
  const { member } = props;

  return (
    <Container className={classes.root}>
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.image}>
          <LazyLoadImage
            src={member.image}
            alt={member.name}
            height="150"
            width="150"
            className={classes.roundedImage}
          />
        </Grid>

        <Grid item>
          <Typography variant="h6" component="h6" align="center" color="textPrimary" gutterBottom>
            {member.name}
          </Typography>
        </Grid>

        <Grid item>
          <Typography variant="caption" align="center" color="textPrimary" gutterBottom>
            {member.position}
          </Typography>
        </Grid>

        <Grid
          item
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
          className={classes.links}
        >
          {member.linkedin !== '' ? (
            <Grid item>
              <Link
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
              >
                <LinkedInIcon />
              </Link>
            </Grid>
          ) : (
            ''
          )}
          {member.website !== '' ? (
            <Grid item>
              <Link href={member.website} target="_blank" rel="noopener noreferrer" color="primary">
                <LanguageIcon />
              </Link>
            </Grid>
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </Container>
  );
}
