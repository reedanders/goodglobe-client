import React, { useRef, useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { onError } from "../libs/errorLib";
import { API, Storage } from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import config from "../config";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';

import {stateFromHTML} from 'draft-js-import-html';
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
  objectiveTags : {
    marginTop: theme.spacing(2),
    marginRight: theme.spacing(1)
  },
  objectiveContainer: {
    padding: theme.spacing(2),
    border: 'solid gray 1px',
    borderRadius: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  objectivesWrapper: {
    paddingTop: theme.spacing(1)
  },
  objectivesTitle: {
    paddingBottom: theme.spacing(1),
    color: 'rgba(0, 0, 0, 0.5)'
  },
  objectivesHelper: {
    paddingLeft: theme.spacing(2),
    color: 'rgba(0, 0, 0, 0.5)'
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
  imageInput: {
    padding: theme.spacing(1)
  },
  toggle: {
    paddingLeft: theme.spacing(2)
  }

}));

export default function EditProject() {
  const classes = useStyles();
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  const [project, setProject] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const editor = useRef(null);
  
  const [title, setTitle] = useState("");
  const [pitch, setPitch] = useState("");
  const [is_public, setIsPublic] = useState(false);

  const [theme_biodiv, setTheme_biodiv] = useState("");
  const [theme_habitat, setTheme_habitat] = useState("");
  const [theme_air, setTheme_air] = useState("");
  const [theme_waste, setTheme_waste] = useState("");
  const [theme_water, setTheme_water] = useState("");
  const [theme_resilience, setTheme_resilience] = useState("");
  const [theme_mitigation, setTheme_mitigation] = useState("");
  const [theme_awareness, setTheme_awareness] = useState("");
  const [theme_knowledge, setTheme_knowledge] = useState("");

  const emptyObjective = {
    "title" : "",
    "description" : "",
    "status" : ""
  }
  const [objectives, setObjectives] = useState([emptyObjective])


  useEffect(() => {
    function loadProject() {
      return API.get("goodglobe", `/projects/edit/${id}`, {
        'queryStringParameters': {
          'projectId': id
        }
      });
    }

    async function onLoad() {
      try {
        const project = await loadProject();
        setProject(project);
        const { title,
                pitch,
                content, 
                is_public, 
                attachment, 
                objectives,
                theme_biodiv,
                theme_habitat,
                theme_air,
                theme_waste,
                theme_water,
                theme_resilience,
                theme_mitigation,
                theme_awareness,
                theme_knowledge,
              } = project;

        if (attachment) {
          project.attachmentURL = await Storage.vault.get(attachment);
        }

        setTitle(title);
        setEditorState(EditorState.createWithContent(stateFromHTML(content)));
        setPitch(pitch);
        setIsPublic(is_public);
        setObjectives(objectives);
        setTheme_biodiv(theme_biodiv);
        setTheme_habitat(theme_habitat);
        setTheme_air(theme_air);
        setTheme_water(theme_water);
        setTheme_waste(theme_waste);
        setTheme_resilience(theme_resilience);
        setTheme_mitigation(theme_mitigation);
        setTheme_awareness(theme_awareness);
        setTheme_knowledge(theme_knowledge);
        setProject(project);

      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, [id] );


  async function handleSubmit(event) {

  	let attachment

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
      
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      // setContent(stateToHTML(editorState.getCurrentContent()));

      await saveProject({
      	title,
        content: stateToHTML(editorState.getCurrentContent()),
        pitch, 
        is_public,
        theme_biodiv,
        theme_habitat,
        theme_air,
        theme_waste,
        theme_water,
        theme_resilience,
        theme_mitigation,
        theme_awareness,
        theme_knowledge,
        attachment: attachment || project.attachment,
        objectives
      });
      history.push("/dashboard");
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  };


  async function handleDelete(event) {

    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      await deleteProject();
      history.push("/dashboard");
    } catch (e) {
      setIsDeleting(false);
      onError(e);
    }

  };

  function saveProject(project) {
    return API.put("goodglobe", `/projects/${id}`, {
      body: project
    });
  };

  function deleteProject() {
    return API.del("goodglobe", `/projects/${id}`);
  };

  function validateForm() {
    return (title.length > 0 && title.length < 55);
  };

  function handleFileChange(event) {
    file.current = event.target.files[0];
  };

  const toggleChecked = () => {
    setIsPublic((prev) => !prev);
  };

  const handleObjectiveChange = index => e => {

    const prop_name = e.target.name;
    let newArr = [...objectives];
    newArr[index][prop_name] = e.target.value; 

    setObjectives(newArr);
  };

  function addObjective () {
    const last = objectives.length - 1;
    return objectives[last].title !== "" && objectives[last].description !== "" ? setObjectives(objectives => objectives.concat(emptyObjective)) : alert('Nope!');
  };

  const removeIndex = index => e => {
    setObjectives(objectives.filter((_, i2) => i2 !== index));
  }

  return (
    <Container className="EditProject, {classes.paper}" maxWidth="sm">
      <CssBaseline />
        {project && (<div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Project
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
            <TextField
              value={title}
              onChange={e => setTitle(e.target.value)}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
            />
            <TextField
              value={pitch}
              onChange={e => setPitch(e.target.value)}
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
            <Typography variant="body1" component="p" className={classes.editorTitle}>Background</Typography>
            <div className={classes.editor}>
            <Editor
              spellCheck
              ref={editor}
              editorState={editorState}
              onChange={editorState => setEditorState(editorState)}
            />
            </div>
            <Typography variant="caption" className={classes.editorHelper}>Enter a detailed explaining the motivation of your project</Typography>
            <Divider className={classes.divider}/>
            <div className={classes.objectivesWrapper}>
            <Typography variant="body1" component="p" className={classes.objectivesTitle} gutterBottom>Objectives</Typography>
            <Typography variant="caption" className={classes.objectivesHelper}>Add objectives needed to complete your project</Typography>
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
                  control={<Checkbox checked={theme_biodiv} onChange={e => setTheme_biodiv(e.target.checked)} id="theme_biodiv" name="theme_biodiv" />}
                  label="Biodiversity"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_habitat} onChange={e => setTheme_habitat(e.target.checked)} id="theme_habitat" name="theme_habitat" />}
                  label="Habitat"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_air} onChange={e => setTheme_air(e.target.checked)} id="theme_air" name="theme_air" />}
                  label="Air"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_waste} onChange={e => setTheme_waste(e.target.checked)} id="theme_waste" name="theme_waste" />}
                  label="Waste"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_water} onChange={e => setTheme_water(e.target.checked)} id="theme_water" name="theme_water" />}
                  label="Water"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_resilience} onChange={e => setTheme_resilience(e.target.checked)} id="theme_resilience"  name="theme_resilience" />}
                  label="Climate Resilience"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_mitigation} onChange={e => setTheme_mitigation(e.target.checked)} id="theme_mitigation" name="theme_mitigation" />}
                  label="Climate Mitigation"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_awareness} onChange={e => setTheme_awareness(e.target.checked)} id="theme_awareness" name="theme_awareness" />}
                  label="Awareness"
                />
                <FormControlLabel
                  control={<Checkbox checked={theme_knowledge} onChange={e => setTheme_knowledge(e.target.checked)} id="theme_knowledge" name="theme_knowledge" />}
                  label="Knowledge"
                />
              </FormGroup>
            </FormControl>

            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.editorTitle}>Project Image</Typography>
            <Input placeholder={project.attachment} id="file" type="file" className={classes.imageInput} onChange={handleFileChange}/>
            <Divider className={classes.divider}/>
            <Typography variant="body1" component="p" className={classes.editorTitle}>Project status</Typography>
            <FormControlLabel
              id="is_public"
    		      control={<Switch checked={is_public} onChange={toggleChecked} color="primary"/>}
    		      label={is_public ? "Public" : "Private"}
              className={classes.toggle}
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
              Submit
            </Button>
            <Button
              fullWidth
              variant="contained"
              onClick={handleDelete}
              endIcon={isDeleting ? <CircularProgress size={20} color="inherit"/> : <div style={{width:"20px"}}/>}
            >
              Delete
            </Button>
          </form>
        </div>)}
    </Container>
  );
}