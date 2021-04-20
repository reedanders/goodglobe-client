import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ProgressFunding from './ProgressFunding';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight: '65vh',
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
    height: '15vh',
  },
  cardActions: {
    flexGrow: 1,
    padding: 0,
  },
  cardActionGrid: {
    padding: theme.spacing(2),
  },
  cardHeaderSubtitle: {
    fontWeight: 700,
  },
}));

export default function ProjectCard(props) {
  const classes = useStyles();
  const { project, feature } = props;
  const pitch = project.pitch.replace(/^(.{50}[^\s]*).*/, '$1');

  function setProgressValue(current, target) {
    return 100 * (current / target);
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  return (
    <Card className={classes.card}>
      <CardActionArea href={`/project/${project.readable_url}`}>
        <CardMedia
          className={classes.cardMedia}
          image={project.attachment[0]}
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
          <Typography gutterBottom variant="h6" component="h6">
            {project.title}
          </Typography>
          { !feature ? 
          <Typography gutterBottom variant="body2">
          {pitch.length > 50 ? `${pitch} ...` : pitch} 
          </Typography>
          : <Typography gutterBottom variant="body2"></Typography> }
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Grid container className={classes.cardActionGrid} direction="column">
            <Grid item>
              <Typography
                className={classes.cardHeaderSubtitle}
                gutterBottom
                variant="subtitle1"
                component="h2"
              >
                EUR {numberWithCommas(project.current_funding)}
                <Typography variant="caption">
                  {' '}
                  raised of EUR {numberWithCommas(project.target_funding)} goal
                </Typography>
              </Typography>
            </Grid>
            <Grid item>
              <ProgressFunding
                value={setProgressValue(project.current_funding, project.target_funding)}
              />
            </Grid>
          </Grid>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
