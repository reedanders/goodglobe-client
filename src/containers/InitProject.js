import React, { useState } from "react";import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { API, Auth } from "aws-amplify";

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  formGroup: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2)
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider:{
    margin: theme.spacing(2)
  },
  stepper: {
    width: '100%'
  },
  stepperPaper: {
    position: 'relative',
    width: '100%',
    height: '50vh',
    backgroundColor: theme.palette.common.white,
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
}));


export default function CreateProject() {
  const classes = useStyles();

  const [isLoading, setIsLoading] = useState(false);

  const [fields, handleFieldChange] = useFormFields({
    title: "",
    pitch: "",
    content: "",
    objectives: "",
    attachment: null,
    target_funding: 1,
    current_funding: 0,
    theme_biodiv: false,
    theme_habitat: false,
    theme_air: false,
    theme_waste: false,
    theme_water: false,
    theme_resilience: false,
    theme_mitigation: false,
    theme_awareness: false,
    theme_knowledge: false,
    is_public: false,
    practioner: false,
    practioner_fullname: "",
    practioner_image: "",
    practioner_profile: "",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setIsLoading(true);

      const user = await Auth.currentUserInfo();
      fields.practioner_fullname = user.attributes.name
      fields.practioner_image = user.attributes.picture
      if( user.attributes.profile !== undefined ) {
            fields.practioner_profile = user.attributes.profile
        }

      const response = await createProject({ ...fields  });
      const projectId = response['projectId'];
      console.log(projectId)
      setIsLoading(true);
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  }


  function createProject(project) {
    return API.post("goodglobe", "/projects", {
      body: project
    });
  }

  function validateForm() {
    return (fields.title.length > 0 && fields.title.length < 55);
  }

  return (
    <Container className="CreateProject, {classes.paper}" maxWidth="md">
      <CssBaseline />
        <div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Create a project name
          </Typography>

          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={fields.title}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              max="55"
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              autoFocus
            />
            <TextField
              value={fields.pitch}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="pitch"
              label="Pitch"
              name="pitch"
              autoComplete="pitch"
              helperText="Enter a brief summary of your project"
            /> 
            <Divider className={classes.divider}/>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={!validateForm()}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <div style={{width:"20px"}}/>}
            >
              Submit
            </Button>
          </form>
        </div>
    </Container>
  );
}