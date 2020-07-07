import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";
import { Auth } from "aws-amplify";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useSnackbar } from 'notistack';


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
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


export default function Signup() {
  const classes = useStyles();
  const [fields, handleFieldChange] = useFormFields({
    email: "",
    password: "",
    confirmPassword: "",
    nick_name: "",
    full_name: "",
    confirmationCode: "",
  });
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState(null);
  const { userHasAuthenticated } = useAppContext();
  const { enqueueSnackbar } = useSnackbar();

  function validateForm() {
    return (
      fields.email.length > 0 &&
      fields.password.length > 0 &&
      fields.password === fields.confirmPassword &&
      fields.nick_name.length > 0 &&
      fields.full_name.length > 0
    );
  }

  function validateConfirmationForm() {
    return fields.confirmationCode.length > 0;
  }

  function alertError(msg) {
    enqueueSnackbar(msg , {
      variant: 'error',
      anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'center',
      },
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const avatar = Math.random().toString(36).substring(2);

    try {
      setIsLoading(true);
      const newUser = await Auth.signUp({
        username: fields.email,
        password: fields.password,
        attributes: {
          nickname: fields.nick_name,
          name: fields.full_name,
          picture: `https://avatars.dicebear.com/api/jdenticon/${avatar}.svg`,
          updated_at: String(Date.now()),
        },
      });
      setNewUser(newUser);
    } catch (e) {
      setIsLoading(false);
      alertError(onError(e));
    }
  }

  async function handleConfirmationSubmit(event) {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(fields.email, fields.confirmationCode);
      await Auth.signIn(fields.email, fields.password);

      userHasAuthenticated(true);
      history.push("/");
    } catch (e) {
      const msg = onError(e);
      alertError(msg);
    }
  }

  function renderConfirmationForm() {
    return (
      <div className={classes.innerPaper}>
      <form className={classes.form} onSubmit={handleConfirmationSubmit}>
        <TextField
          value={fields.confirmationCode}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="confirmationCode"
          label="Confirmation Code"
          name="confirmationCode"
          type="tel"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={!validateConfirmationForm()}
        >
          Verify
        </Button>
      </form>
      </div>
    );
  }

  function renderForm() {
    return (
      <div className={classes.innerPaper}>
      <Typography component="h1" variant="h5">
        Signup
      </Typography>

      <form className={classes.form} onSubmit={handleSubmit}>
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
          />
        <TextField
          value={fields.nick_name}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nick_name"
          label="Nick Name"
          name="nick_name"
          autoComplete="nick_name"
        />
        <TextField
          value={fields.full_name}
          onChange={handleFieldChange}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="full_name"
          label="Full Name"
          name="full_name"
          autoComplete="full_name"
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
          disabled={!validateForm()}
          endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <div style={{width:"20px"}}/>}
        >
          Signup
        </Button>
      </form>
      </div>
    );
  }

  return (
    <Container className="Signup" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <LockOutlinedIcon />
      </Avatar>
      {newUser === null ? renderForm() : renderConfirmationForm()}
      </div>
    </Container>
  );
}