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
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function EditProject() {
  const classes = useStyles();
  const file = useRef(null);
  const { id } = useParams();
  const history = useHistory();

  const [project, setProject] = useState(null);

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );

  const editor = useRef(null);
  
  const [title, setTitle] = useState("");
  const [theme_biodiv, setTheme_biodiv] = useState("");
  const [theme_culture, setTheme_culture] = useState("");
  const [theme_carbon, setTheme_carbon] = useState("");
  const [is_public, setIsPublic] = useState(false);


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
        console.log(project);
        const { title, content, is_public, theme_biodiv, theme_culture, theme_carbon, attachment} = project;

        if (attachment) {
          project.attachmentURL = await Storage.vault.get(attachment);
        }

        setTitle(title);
        setEditorState(EditorState.createWithContent(stateFromHTML(content)));
        setIsPublic(is_public);
        setTheme_biodiv(theme_biodiv);
        setTheme_culture(theme_culture);
        setTheme_carbon(theme_carbon);
        setProject(project);
      } catch (e) {
        console.log(e);
        onError(e);
      }
    }

    onLoad();
  }, [id]);


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
      if (file.current) {
        attachment = await s3Upload(file.current);
      }

      // setContent(stateToHTML(editorState.getCurrentContent()));

      await saveProject({
      	title,
        content: stateToHTML(editorState.getCurrentContent()),
        is_public,
        theme_biodiv,
        theme_culture,
        theme_carbon,
        attachment: attachment || project.attachment
      });
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }


  async function handleDelete(event) {
    event.preventDefault();

    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject();
      history.push("/");
    } catch (e) {
      onError(e);
    }
  }

  function saveProject(project) {
    return API.put("goodglobe", `/projects/${id}`, {
      body: project
    });
  }

  function deleteProject() {
    return API.del("goodglobe", `/projects/${id}`);
  }

  function validateForm() {
    return true;
    // return (content.length > 0 && title.length > 0);
  }

  function handleFileChange(event) {
    file.current = event.target.files[0];
  }

  const toggleChecked = () => {
    setIsPublic((prev) => !prev);
    console.log(is_public)
  };

  return (
    <Container className="EditProject, {classes.paper}" maxWidth="xs">
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
              autoFocus
            />
            <Editor
              spellCheck
              ref={editor}
              editorState={editorState}
              onChange={editorState => setEditorState(editorState)}
            />
            <TextField
              value={theme_biodiv}
              onChange={e => setTheme_biodiv(e.target.value)}
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
              value={theme_culture}
              onChange={e => setTheme_culture(e.target.value)}
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
              value={theme_carbon}
              onChange={e => setTheme_carbon(e.target.value)}
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
            <Input placeholder={project.attachment} id="file" type="file" onChange={handleFileChange}/>
            <FormControlLabel
              id="is_public"
		      control={<Switch checked={is_public} onChange={toggleChecked} color="primary"/>}
		      label={is_public ? "Public" : "Private"}
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
            <Button
              fullWidth
              variant="contained"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </form>
        </div>)}
    </Container>
  );
}