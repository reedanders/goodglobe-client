import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    minWidth: 150,
    width: '100%',
  },
  image: {
    position: 'relative',
    height: 150,
    width: 150,
    [theme.breakpoints.down('xs')]: {
      width: '100% !important', // Overrides inline-style
      height: 100,
    },
    '&:hover, &$focusVisible': {
      zIndex: 1,
      '& $imageBackdrop': {
        opacity: 0.15,
      },
      '& $imageMarked': {
        opacity: 0,
      },
      '& $imageTitle': {
        border: '4px solid transparent',
      },
    },
  },
  focusVisible: {},
  imageGrid: {
    width: '100%'
  },
  imageButton: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.black,
  },
  imageTitle: {
    position: 'relative'
  },
  imageMarked: {
    height: 3,
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
  },
}));

export default function ButtonBases(props) {
  const classes = useStyles();
  const {icon} = props;

  return (
    <div className={classes.root}>
      <ButtonBase
          focusRipple
          key={icon.title}
          className={classes.image}
          focusVisibleClassName={classes.focusVisible}
          href={`/discover#${icon.title}`}
        >
          <span className={classes.imageButton}>
            <Grid container direction="column" justify="center" alignItems="center">
            <Grid item><img src={icon.image} alt={icon.attribution} className={classes.imageGrid}/></Grid>
            <Grid item>
              <Typography
                variant="h6" 
                component="h6"
                color="inherit"
                className={classes.imageTitle}
              >
                {icon.title}
              </Typography>
            </Grid>
            </Grid>
          </span>
        </ButtonBase>
    </div>
  );
}
