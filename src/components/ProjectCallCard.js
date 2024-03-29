import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';

import PractionerAvatar from './PractionerAvatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    marginTop: theme.spacing(1),
    minHeight: '50vh',
  },
  detailsText: {
    paddingTop: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(0),
    paddingRight: theme.spacing(2),
  },
  detailsSubtext: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(2),
  },
  detailsFiller: {
    flex: 'auto',
  },
  detailsPlace: {
    paddingTop: theme.spacing(0),
    paddingLeft: theme.spacing(2),
    paddingBottom: theme.spacing(1),
    paddingRight: theme.spacing(2),
  },
  image: {
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderBottomRightRadius: 3,
    borderTopRightRadius: 3,
    minHeight: '30vh',
  },
  supporterChip: {
    margin: theme.spacing(2),
  },
  supporterFill: {
    minHeight: '150px',
  },
  fill: {
    objectFit: 'cover',
    height: '50vh',
  },
  fillCarousel: {
    height: '100%',
    display: 'flex',
    borderBottomLeftRadius: '3px',
    borderTopLeftRadius: '3px',
  },
  fillWrapper: {
    minHeight: '50vh',
  },
  practioner: {
    padding: theme.spacing(2),
  },
  divider: {
    width: '80%',
  },
}));

export default function MediaControlCard(props) {
  const { project } = props;
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("md"));

  const [isBiodiv, setIsBiodiv] = useState('');
  const [isHabitat, setIsHabitat] = useState('');
  const [isAir, setIsAir] = useState('');
  const [isWaste, setIsWaste] = useState('');
  const [isWater, setIsWater] = useState('');
  const [isResilience, setIsResilience] = useState('');
  const [isMitigation, setIsMitigation] = useState('');
  const [isAwareness, setIsAwareness] = useState('');
  const [isKnowledge, setIsKnowledge] = useState('');
  const [donors, setDonors] = useState('0');

  function fakeDonors(funding) {
    if (funding > 0) {
      return numberWithCommas(Math.round(funding / 15));
    } else {
      return '0';
    }
  }

  function numberWithCommas(x) {
    if (x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    } else {
      return;
    }
  }

  useEffect(() => {
    async function onLoad() {
      setIsBiodiv(project.theme_biodiv);
      setIsHabitat(project.theme_habitat);
      setIsAir(project.theme_air);
      setIsWaste(project.theme_waste);
      setIsWater(project.theme_water);
      setIsResilience(project.theme_resilience);
      setIsMitigation(project.theme_mitigation);
      setIsAwareness(project.theme_awareness);
      setIsKnowledge(project.theme_knowledge);
      setDonors(fakeDonors(project.current_funding));
    }

    onLoad();
  });

  return (
    <div>
      <Paper className={classes.root}>
        <Grid container spacing={0}>
          <Grid
            container
            item
            md={6}
            sm={12}
            justify="flex-start"
            alignItems={!matches ? `flex-start` : `flex-end`}
          >
            <Carousel
              showArrows={false}
              showStatus={false}
              showThumbs={false}
              stopOnHover
              swipeable
              infiniteLoop
              autoPlay
              donors={donors}
              className={classes.fillCarousel}
            >
              {project.attachment.map((img) => (
                <div className={classes.fillWrapper}>
                  <LazyLoadImage src={img} alt="idea watering plant" className={classes.fill} />
                </div>
              ))}
            </Carousel>
          </Grid>
          <Grid container item direction="column" md={6}>
            <Grid item className={classes.detailsText}>
              <Typography component="h5" variant="h5">
                {project.title}
              </Typography>
            </Grid>
            <Grid item className={classes.detailsSubtext}>
              <Typography variant="subtitle1" color="textSecondary">
                {project.pitch}
              </Typography>
            </Grid>
            <Grid container item spacing={2} className={classes.detailsSubtext}>
              {isBiodiv ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Biodiversity" />
                </Grid>
              ) : (
                ''
              )}
              {isHabitat ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Habitat" />
                </Grid>
              ) : (
                ''
              )}
              {isAir ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Air" />
                </Grid>
              ) : (
                ''
              )}
              {isWaste ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Waste" />
                </Grid>
              ) : (
                ''
              )}
              {isWater ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Water" />
                </Grid>
              ) : (
                ''
              )}
              {isResilience ? (
                <Grid item>
                  <Chip
                    variant="outlined"
                    size="small"
                    color="primary"
                    label="Climate Resilience"
                  />
                </Grid>
              ) : (
                ''
              )}
              {isMitigation ? (
                <Grid item>
                  <Chip
                    variant="outlined"
                    size="small"
                    color="primary"
                    label="Climate Mitigation"
                  />
                </Grid>
              ) : (
                ''
              )}
              {isAwareness ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Awareness" />
                </Grid>
              ) : (
                ''
              )}
              {isKnowledge ? (
                <Grid item>
                  <Chip variant="outlined" size="small" color="primary" label="Knowledge" />
                </Grid>
              ) : (
                ''
              )}
            </Grid>
            <Grid item className={classes.detailsFiller}></Grid>
            <Grid item className={classes.practioner}>
              <PractionerAvatar project={project} />
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
