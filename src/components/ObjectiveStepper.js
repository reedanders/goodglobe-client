import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    paddingBottom: theme.spacing(2)
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  stepper: {
    backgroundColor: 'inherit'
  },
  actionsContainer: {
    marginBottom: theme.spacing(2),
  },
  resetContainer: {
    padding: theme.spacing(3),
  },
}));



export default function VerticalLinearStepper(props) {
  const classes = useStyles();
  const { project } = props;

  return (
    <div className={classes.root}>
      <Stepper orientation="vertical" className={classes.stepper}>
        {project.objectives.map((obj, index) => (
          <Step expanded active key={index}>
            <StepLabel>{obj.title}</StepLabel>
            <StepContent>
              <Typography>{obj.description}</Typography>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
