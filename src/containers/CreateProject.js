import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { useFormFields } from "../libs/hooksLib";
import { API, Auth } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';

import {stateToHTML} from 'draft-js-export-html';
import {Editor, EditorState} from 'draft-js';
import './Editor.css';

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
  divider:{
    margin: theme.spacing(2)
  },
  editorTitle: {
    paddingLeft: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  objectiveTags : {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  objectiveContainer: {
    padding: theme.spacing(2),
    border: 'solid gray 1px',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
  }
}));

export default function CreateProject() {
  const classes = useStyles();
  const file = useRef(null);
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const editor = useRef(null);

  const [fields, handleFieldChange] = useFormFields({
    title: "",
    pitch: "",
    content: "",
    attachment: null,
    target_funding: 0,
    current_funding: 0,
    theme_biodiv: 0,
    theme_culture: 0,
    theme_carbon: 0,
    is_public: false,
    practioner: false,
    practioner_fullname: "",
    practioner_image: "",
    practioner_profile: "",
  });

  const emptyObjective = {
    "title" : "",
    "description" : "",
    "status" : ""
  }

  const [objectives, setObjectives] = useState([emptyObjective])

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

    try {
      setIsLoading(true);
      fields.attachment = file.current ? await s3Upload(file.current) : null;

      fields.content = stateToHTML(editorState.getCurrentContent());

      const user = await Auth.currentUserInfo();
      fields.practioner_fullname = user.attributes.name
      fields.practioner_image = user.attributes.picture
      if( user.attributes.profile !== undefined ) {
            fields.practioner_profile = user.attributes.profile
        }

      await createProject({ ...fields, objectives });
      history.push("/dashboard");
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

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  const handleObjectiveChange = index => e => {

    const prop_name = e.target.name;
    let newArr = [...objectives]; 
    newArr[index][prop_name] = e.target.value; 

    setObjectives(newArr);
  }

  function addObjective () {
    const last = objectives.length - 1;
    return objectives[last].title !== "" ? setObjectives(objectives => objectives.concat(emptyObjective)) : alert('Nope!');
  }

  const removeIndex = index => e => {
    setObjectives(objectives.filter((_, i2) => i2 !== index));
  }

  return (
    <Container className="CreateProject, {classes.paper}" maxWidth="sm">
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
            />
            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.editorTitle}>Background</Typography>
            <div className={classes.editor}>
            <Editor
              spellCheck
              ref={editor}
              editorState={editorState}
              onChange={editorState => setEditorState(editorState)}
              style={{background: 'blue'}}
            /></div>
            <Divider className={classes.divider}/>
            <Typography variant="h6" component="h6" gutterBottom>Objectives</Typography>
            {objectives.map((data, index) => (
              <div key={index} className={classes.objectiveContainer}>
              <Grid container justify="space-between" spacing={3}>
                <Grid item xs={10}>
                  <TextField
                    value={data.title}
                    onChange={handleObjectiveChange(index)}
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    id="title"
                    label="Objective Title"
                    name="title"
                    autoComplete="title"
                  />
                  <TextField
                    value={data.description}
                    onChange={handleObjectiveChange(index)}
                    variant="outlined"
                    margin="normal"
                    type="text"
                    fullWidth
                    id="description"
                    label="Objective Description"
                    name="description"
                    autoComplete="description"
                  />
                </Grid>
                <Grid item xs={1} className={classes.objectiveTags}>
                  <IconButton onClick={removeIndex(index)} aria-label="delete">
                    <DeleteForeverIcon />
                  </IconButton>
                </Grid>

              </Grid>
              </div>
            ))}
            <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={addObjective}>Add Objective</Button>
            
            <Divider className={classes.divider}/>
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
            />
            <TextField
              value={fields.target_funding}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              id="target_funding"
              label="Target Funding"
              name="target_funding"
              autoComplete="target_funding"
            />
            <TextField
              value={fields.current_funding}
              onChange={handleFieldChange}
              variant="outlined"
              margin="normal"
              type="number"
              required
              fullWidth
              id="current_funding"
              label="Current Funding"
              name="current_funding"
              autoComplete="current_funding"
            />
            <Input id="file" type="file" onChange={handleFileChange}/>
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