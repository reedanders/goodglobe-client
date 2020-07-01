import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Title from '../containers/Title';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  paper: {
    maxWidth: 936,
    margin: 'auto',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));


export default function EditUser() {
  const history = useHistory();
  const classes = useStyles();
  
  const [nickname, setNickname] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {

    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setNickname(user.attributes.nickname);
        setFullname(user.attributes.name);
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  async function handleUpdateClick(event) {
    event.preventDefault();

    try {
      // const user = await Auth.currentAuthenticatedUser();
      // const response = await Auth.updateUserAttributes(user, { nickname: nickname, name: full });
      history.push("/");
    } catch (error) {
      onError(error);
    }
  }

  // function validateEmailForm() {
  //   return fields.email.length > 0;
  // }

  return (
    <div className="EditUser">
      <CssBaseline />
      <Paper className={classes.paper}>
      <Title>
            Edit Account Information
        </Title>
      <form onSubmit={handleUpdateClick}>
        <TextField
          value={nickname}
          onChange={e => setNickname(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="nickname"
          label="Nickname"
          name="nickname"
          autoComplete="nickname"
          autoFocus
        />
        <TextField
          value={fullname}
          onChange={e => setFullname(e.target.value)}
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="fullname"
          label="Full name"
          name="fullname"
          autoComplete="fullname"
          autoFocus
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
        </Button>
      </form>
      </Paper>
    </div>
  );
}