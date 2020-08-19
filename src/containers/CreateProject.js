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
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Grid from '@material-ui/core/Grid';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';

import { DropzoneArea } from 'material-ui-dropzone';
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
  editor:{
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  editorTitle: {
    paddingLeft: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  editorHelper: {
    paddingTop: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  objectivesTitle: {
    paddingBottom: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  objectivesHelper: {
    paddingLeft: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  objectivesWrapper: {
    paddingTop: theme.spacing(1)
  },
  objectiveTags: {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  objectiveContainer: {
    padding: theme.spacing(2),
    border: 'solid gray 1px',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  imageInput: {
    padding: theme.spacing(1)
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

  function handleFileChange(files) {
    file.current = files[0];
  }

  const handleObjectiveChange = index => e => {

    const prop_name = e.target.name;
    let newArr = [...objectives]; 
    newArr[index][prop_name] = e.target.value; 

    setObjectives(newArr);
  }

  function addObjective () {
    const last = objectives.length - 1;
    return objectives[last].title !== "" && objectives[last].description !== "" ? setObjectives(objectives => objectives.concat(emptyObjective)) : alert('Please finish the current objective');
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
              helperText="Enter a brief summary of your project"
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
            <Typography variant="caption" className={classes.editorHelper}>Enter a detailed explaining the motivation of your project</Typography>
            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.objectivesTitle} gutterBottom>Objectives</Typography>
            <Typography variant="caption" className={classes.objectivesHelper}>Edit objectives needed to complete your project</Typography>
            <div className={classes.objectivesWrapper}>
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
                { index > 0 ? 
                  <Grid item xs={1} className={classes.objectiveTags}>
                    <IconButton onClick={removeIndex(index)} aria-label="delete">
                      <DeleteForeverIcon />
                    </IconButton>
                  </Grid>: ""}

              </Grid>
              </div>
            ))}
            <Button variant="contained" color="secondary" startIcon={<AddCircleIcon />} onClick={addObjective}>Add Objective</Button>
            </div>

            <Divider className={classes.divider}/>
            <FormControl component="fieldset">
              <FormLabel component="legend">Themes</FormLabel>
              <FormGroup className={classes.formGroup}>
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_biodiv} onChange={handleFieldChange} id="theme_biodiv" name="theme_biodiv" />}
                  label="Biodiversity"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_habitat} onChange={handleFieldChange} id="theme_habitat" name="theme_habitat" />}
                  label="Habitat"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_air} onChange={handleFieldChange} id="theme_air" name="theme_air" />}
                  label="Air"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_waste} onChange={handleFieldChange} id="theme_waste" name="theme_waste" />}
                  label="Waste"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_water} onChange={handleFieldChange} id="theme_water" name="theme_water" />}
                  label="Water"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_resilience} onChange={handleFieldChange} id="theme_resilience"  name="theme_resilience" />}
                  label="Climate Resilience"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_mitigation} onChange={handleFieldChange} id="theme_mitigation" name="theme_mitigation" />}
                  label="Climate Mitigation"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_awareness} onChange={handleFieldChange} id="theme_awareness" name="theme_awareness" />}
                  label="Awareness"
                />
                <FormControlLabel
                  control={<Checkbox checked={fields.theme_knowledge} onChange={handleFieldChange} id="theme_knowledge" name="theme_knowledge" />}
                  label="Knowledge"
                />
              </FormGroup>
            </FormControl>
            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.editorTitle}>Funding</Typography>
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
            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.editorTitle}>Project Image</Typography>
            <DropzoneArea
              acceptedFiles={['image/*']}
              dropzoneText={"Drag and drop an image here or click"}
              id="file" 
              type="file"
              filesLimit={1}
              onChange={(files) => handleFileChange(files)}
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