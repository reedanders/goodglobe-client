import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Jumbotron, Button } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import { NavLink } from "react-router-dom"

import { 
	Grid, CircularProgress, Link, List, ListItem, Divider,
	ListItemText, ListItemAvatar, Avatar, Typography, ListItemIcon,
	Card, CardActionArea, CardActions, CardContent
	} 
	from '@material-ui/core';

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
	      console.log(projects)
	      setProjects(projects);
	    } catch (e) {
	      onError(e);
	    }

	    setIsLoading(false);
	  }

	  onLoad();
	}, [isAuthenticated]);

	function loadProjects() {
	  return API.get("goodglobe", "/projects");
	}

  function renderProjectsList(projects) {
	  return [{}].concat(projects).map((project, i) =>
	    i !== 0 ? (
	      <NavLink key={project.projectId} to={`/projects/${project.projectId}`}>
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
        <PageHeader>Your Projects</PageHeader>
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