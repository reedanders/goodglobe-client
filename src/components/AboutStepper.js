import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));

const steps = [{
          title: "Practitioners draft an environmental conservation project and submit it for review by GoodGlobe",
        },
        {
          title: "GoodGlobe provides feedback and accepts projects",
        },
        {
          title: "Individuals and institutions provide direct funding to projects"
        }];

export default function HorizontalLinearStepper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Stepper alternativeLabel>
        {steps.map((obj, index) => (
          <Step expanded active key={index}>
            <StepLabel>{obj.title}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
