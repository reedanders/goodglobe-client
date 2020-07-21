import React, { useRef, useState, useEffect } from "react";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import CircularProgress from '@material-ui/core/CircularProgress';

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
  }
}));

export default function EditProject(props) {
  const classes = useStyles();

  const [project, setProject] = useState("");

  const { projectId } = props;
  const [id, setId] = useState("")
  setId(projectId);

  const [isLoading, setIsLoading] = useState(false);

  const [editorState, setEditorState] = useState(
    EditorState.createEmpty()
  );
  const editor = useRef(null);


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
        const { content } = project;

        setEditorState(EditorState.createWithContent(stateFromHTML(content)));

      } catch (e) {
        onError(e);
      }
    }

    onLoad();
  }, );


  async function handleSubmit(event) {

    event.preventDefault();

    try {
      setIsLoading(true);

      await saveProject({
        content: stateToHTML(editorState.getCurrentContent())
        });
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      onError(e);
    }
  };

  function saveProject(project) {
    return API.put("goodglobe", `/projects/${id}`, {
      body: project
    });
  };

  return (
    <Container className="EditBackground, {classes.paper}" maxWidth="sm">
      <CssBaseline />
        {project && (<div className={classes.paper}>
          <Typography component="h1" variant="h5">
            Edit Project
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} noValidate>
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
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              endIcon={isLoading ? <CircularProgress size={20} color="inherit"/> : <div style={{width:"20px"}}/>}
            >
              Submit
            </Button>
          </form>
        </div>)}
    </Container>
  );
}