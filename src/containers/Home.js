import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";


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
	  return API.get("goodglobe", "/projects");
	}

  function renderProjectsList(projects) {
	  return [{}].concat(projects).map((project, i) =>
	    i !== 0 ? (
	      <LinkContainer key={project.projectId} to={`/projects/${project.projectId}`}>
	        <ListGroupItem header={project.content.trim().split("\n")[0]}>
	          {"Created: " + new Date(project.createdAt).toLocaleString()}
	        </ListGroupItem>
	      </LinkContainer>
	    ) : (
	      <LinkContainer key="new" to="/projects/new">
	        <ListGroupItem>
	          <h4>
	            <b>{"\uFF0B"}</b> Create a new project
	          </h4>
	        </ListGroupItem>
	      </LinkContainer>
	    )
	  );
	}

  function renderLander() {
    return (
      <div className="lander">
        <h1>Scratch</h1>
        <p>A simple project taking app</p>
      </div>
    );
  }

  function renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Your Projects</PageHeader>
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