import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import  idea_bulbs_SMALL  from "../assets/images/drawings/idea_bulbs_SMALL.png"
import  face_thought_SMALL  from "../assets/images/drawings/face_thought_SMALL.png"
import  trumpet_social  from "../assets/images/drawings/trumpet_social.png"

const useStyles = makeStyles((theme) => ({
  cardGrid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(2),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'transparent',
  },
  cardMedia: {
    height: 128,
    width: 128,
  },
  cardContent: {
    flexGrow: 1,
  },
}));

const cards = [
  {
    title: 'Create',
    description: 'Practitioners submit an environmental conservation project for review by scientists',
    image: idea_bulbs_SMALL,
  },
  {
    title: 'Review',
    description: 'Conservation scientists provide feedback and rank proposed projects',
    image: face_thought_SMALL,
  },
  {
    title: 'Crowdfund',
    description: 'Individuals and institutions provide direct funding to practitioners',
    image: trumpet_social,
  },
];

export default function MainFeaturedAlbum() {
  const classes = useStyles();

  return (
    <Container className={classes.cardGrid} maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4} alignItems='center'>
            <Card elevation={0} className={classes.card}>
                <Grid container alignItems='center' justify='center'>
                  <Grid item></Grid>
                  <Grid item>
                    <img src={card.image} alt="Project" className={classes.cardMedia}/>
                  </Grid>
                  <Grid item></Grid>
                </Grid>
              <CardContent align="center" className={classes.cardContent}>
                <Typography gutterBottom variant="h5" component="h2">
                  {card.title} 
                </Typography>
                <Typography>
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
