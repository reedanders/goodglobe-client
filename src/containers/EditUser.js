import React, { useState, useEffect } from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import {
  HelpBlock,
  FormGroup,
  FormControl,
  ControlLabel,
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import { onError } from "../libs/errorLib";

import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
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
  const [codeSent, setCodeSent] = useState(false);
  // const [fields, handleFieldChange] = useFormFields({
  //   code: "",
  //   email: "",
  // });
  const [isConfirming, setIsConfirming] = useState(false);
  const [isSendingCode, setIsSendingCode] = useState(false);

  const [nickname, setNickname] = useState("");
  const [fullname, setFullname] = useState("");

  useEffect(() => {

    async function onLoad() {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setNickname(user.attributes.nickname);
        setFullname(user.attributes.name);
        console.log(user)
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  async function handleUpdateClick(event) {
    event.preventDefault();

    try {
      const user = await Auth.currentAuthenticatedUser();
      const response = await Auth.updateUserAttributes(user, { nickname: nickname });
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
          Modify {isSendingCode ? "true" : "false"}
        </Button>
      </form>
      </Paper>
    </div>
  );
}