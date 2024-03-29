import React, { useState, useEffect, useRef } from 'react';
import { Auth } from 'aws-amplify';
import { API } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
import { onError } from '../libs/errorLib';
import { s3Upload } from '../libs/awsLib';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

import { DropzoneArea } from 'material-ui-dropzone';
import Title from '../components/Title';
import config from '../config';

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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    margin: theme.spacing(2),
  },
  editorTitle: {
    paddingLeft: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.5)',
  },
}));

export default function EditUser() {
  const history = useHistory();
  const classes = useStyles();
  const file = useRef(null);
  const [nickname, setNickname] = useState('');
  const [fullname, setFullname] = useState('');
  const [profile, setProfile] = useState('');
  const [picture, setPicture] = useState('');

  useEffect(() => {
    async function onLoad() {
      try {
        const user = await Auth.currentUserInfo();
        setNickname(user.attributes.nickname);
        setFullname(user.attributes.name);
        setPicture(user.attributes.picture);
        if (user.attributes.profile !== undefined) {
          setProfile(user.attributes.profile);
        }
      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, []);

  async function handleUpdateClick(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(`Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB.`);
      return;
    }

    try {
      const user = await Auth.currentAuthenticatedUser();
      const attachment = file.current ? await s3Upload(file.current) : picture;

      await Auth.updateUserAttributes(user, {
        nickname: nickname,
        name: fullname,
        picture: attachment,
        profile: profile,
        updated_at: String(Date.now()),
      });

      await updateProject({
        practioner_fullname: fullname,
        practioner_image: attachment,
        practioner_profile: profile,
      });

      history.push('/dashboard');
    } catch (error) {
      onError(error);
    }
  }

  function updateProject(project) {
    return API.put('goodglobe', `/projects/user/`, {
      body: project,
    });
  }

  function handleFileChange(files) {
    file.current = files[0];
  }

  return (
    <Container className="EditUser" maxWidth="xs">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Title>Edit Account Information</Title>
        <form onSubmit={handleUpdateClick}>
          <TextField
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="nickname"
            label="Nickname"
            name="nickname"
            autoComplete="nickname"
          />
          <TextField
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="fullname"
            label="Full name"
            name="fullname"
            autoComplete="fullname"
          />
          <TextField
            value={profile}
            onChange={(e) => setProfile(e.target.value)}
            variant="outlined"
            margin="normal"
            multiline
            rows={3}
            fullWidth
            id="profile"
            label="Profile"
            name="profile"
            autoComplete="profile"
          />
          <Divider className={classes.divider} />
          <Typography variant="body1" component="p" className={classes.editorTitle}>
            Profile picture
          </Typography>
          <DropzoneArea
            acceptedFiles={['image/*']}
            dropzoneText={''}
            id="file"
            type="file"
            filesLimit="1"
            useChipsForPreview={true}
            onChange={(files) => handleFileChange(files)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Submit
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
