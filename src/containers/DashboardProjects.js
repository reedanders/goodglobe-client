import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { NavLink } from "react-router-dom"

import Grid from '@material-ui/core/Inbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import InboxIcon from '@material-ui/icons/Inbox';

export default function Home() {
  const [projects, setProjects] = useState([]);
  const { isAuthenticated } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
	  async function onLoad() {
	    if (!isAuthenticated) {
	      return;
	    }

	    try {
	      const projects = await loadProjects();
	      setProjects(projects);
	    } catch (e) {
	      onError(e);
	    }

	    setIsLoading(false);
	  }

	  onLoad();
	}, [isAuthenticated]);

	function loadProjects() {
	  return API.get("goodglobe", "/projects/user");
	}

  function renderProjectsList(projects) {
	  return [{}].concat(projects).map((project, i) =>
	    i !== 0 ? (
	      <NavLink key={project.projectId} to={`/projects/edit/${project.projectId}`}>
	       <List component="nav" aria-label="main mailbox folders">
	      	<ListItem alignItems="flex-start">
	      	<ListItemAvatar>
	          <Avatar alt="Remy Sharp" />
	        </ListItemAvatar>
	        <ListItemText
	          primary={project.content.trim().split("\n")[0]}
	          secondary={
	            <React.Fragment>
	              <Typography
	                component="span"
	                color="textPrimary"
	              >
	                {project.title.trim().split("\n")[0]}
	              </Typography>
	              {" Created: " + new Date(project.createdAt).toLocaleString()}
	            </React.Fragment>
	          }
	        />
	      </ListItem>
	      </List>
	      </NavLink> 
	    ) : (
	      <NavLink key="new" to="/projects/new">
	      <List component="nav" aria-label="main mailbox folders">
	        <ListItem button>
	          <ListItemIcon>
	          	<InboxIcon />
	          </ListItemIcon>
	          <ListItemText primary="New Project" />
	        </ListItem>
	      </List>
	      </NavLink>
	    )
	  );
	}

  function renderLander() {
    return (
    	<Card>
	      <CardActionArea>
	        <CardContent>
	          <Typography gutterBottom variant="h5" component="h2">
	            Lizard
	          </Typography>
	          <Typography variant="body2" color="textSecondary" component="p">
	            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
	            across all continents except Antarctica
	          </Typography>
	        </CardContent>
	      </CardActionArea>
	      <CardActions>
	        <Button href="Login" size="small" color="primary">
	          Share
	        </Button>
	      </CardActions>
	    </Card>
    );
  }

  function renderProjects() {
    return (
      <div className="projects">
        <Typography variant="h5" component="h2">Your Projects</Typography>
        <Grid container justify="center">
          {isLoading ? <CircularProgress /> : ''}
        </Grid>
        
        <ListGroup>
          {!isLoading && renderProjectsList(projects)}
        </ListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderProjects() : renderLander()}
    </div>
  );
}