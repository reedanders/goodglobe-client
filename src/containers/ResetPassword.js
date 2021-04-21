import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import { useFormFields } from '../libs/hooksLib';
import { onError } from '../libs/errorLib';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  innerPaper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    marginTop: theme.spacing(2),
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    code: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [codeSent, setCodeSent] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  function validateCodeForm() {
    return fields.email.length > 0;
  }

  function validateResetForm() {
    return (
      fields.code.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword
    );
  }

  async function handleSendCodeClick(event) {
    event.preventDefault();

    setIsSendingCode(true);

    try {
      await Auth.forgotPassword(fields.email);
      setCodeSent(true);
      setFailed(false);
    } catch (error) {
      onError(error);
      setFailed(true);
      setIsSendingCode(false);
    }
  }

  async function handleConfirmClick(event) {
    event.preventDefault();

    setIsConfirming(true);

    try {
      await Auth.forgotPasswordSubmit(fields.email, fields.code, fields.password);
      setConfirmed(true);
    } catch (error) {
      onError(error);
      setIsConfirming(false);
    }
  }

  function renderRequestCodeForm() {
    return (
      <form onSubmit={handleSendCodeClick}>
        <TextField
          value={fields.email}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          helperText={failed ? "Sorry, we didn't recognize that email." : "We'll attempt to send a reset email to this email address."}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!validateCodeForm()}
          endIcon={
            isSendingCode ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <div style={{ width: '20px' }} />
            )
          }
        >
          Send Confirmation
        </Button>
      </form>
    );
  }

  function renderConfirmationForm() {
    return (
      <div className={classes.innerPaper}>
        <form className={classes.form} onSubmit={handleConfirmClick}>
          <TextField
            value={fields.code}
            onChange={handleFieldChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="code"
            label="Confirmation Code"
            name="code"
            type="tel"
            autoFocus
          />
          <TextField
            value={fields.password}
            onChange={handleFieldChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
          />
          <TextField
            value={fields.confirmPassword}
            onChange={handleFieldChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={!validateResetForm()}
            endIcon={
              isConfirming ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <div style={{ width: '20px' }} />
              )
            }
          >
            Confirm
          </Button>
        </form>
      </div>
    );
  }

  function renderSuccessMessage() {
    return (
      <div className={classes.success}>
        <Grid container direction="column" alignItems="center">
          <Grid item>
            <Typography variant="subtitle1" component="h6">
              Your password has been reset.
            </Typography>
          </Grid>
          <Grid item>
            <Typography variant="body1" component="p">
              <Link to="/login">Click here to login with your new credentials.</Link>
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }

  return (
    <div className="ResetPassword">
      <Container className="Login, {classes.paper}" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset Password
          </Typography>
          {!codeSent
            ? renderRequestCodeForm()
            : !confirmed
            ? renderConfirmationForm()
            : renderSuccessMessage()}
        </div>
      </Container>
    </div>
  );
}
