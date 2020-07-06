import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

import { useAppContext } from "../libs/contextLib";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function TransitionAlerts() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { isNotified, setIsNotified } = useAppContext();

  return (
    (!isNotified ? 
    <div className={classes.root}>
      <Collapse in={open}>
        <Alert
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
                setIsNotified(true);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          Hi there! This is a demo website for GoodGlobe. 
        </Alert>
      </Collapse>
    </div>
    : "")
  );
}
