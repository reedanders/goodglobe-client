import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { API } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
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

export default function CreateProject() {
  const classes = useStyles();
  const file = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    title: "",
    content: "",
    theme_biodiv: 0,
    theme_culture: 0,
    theme_carbon: 0,
    is_public: false,
  });

  async function handleSubmit(event) {
    event.preventDefault();

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    setIsLoading(true);

    try {
      const attachment = file.current ? await s3Upload(file.current) : null;

      await createProject({ ...fields, attachment });
      history.push("/");
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  }


  function createProject(project) {
    return API.post("goodglobe", "/projects", {
      body: project
    });
  }

  function validateForm() {
    return fields.content.length > 0 && fields.title.length > 0;
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  return (
    <Container className="CreateProject, {classes.paper}" maxWidth="xs">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create Project
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={fields.title}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              value={fields.content}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="content"
              label="Content"
              name="content"
              autoComplete="content"
              autoFocus
            />
            <TextField
              value={fields.theme_biodiv}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              id="theme_biodiv"
              label="Biodiversity Contribution"
              name="theme_biodiv"
              autoComplete="theme_biodiv"
              autoFocus
            />
            <TextField
              value={fields.theme_culture}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              id="theme_culture"
              label="Cultural Contribution"
              name="theme_culture"
              autoComplete="theme_culture"
              autoFocus
            />
            <TextField
              value={fields.theme_carbon}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              id="theme_carbon"
              label="Carbon Mitigation"
              name="theme_carbon"
              autoComplete="theme_carbon"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validateForm()}
            >
              Submit
            </Button>
          </form>
        </div>
    </Container>
  );
}