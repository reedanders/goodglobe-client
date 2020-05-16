import React, { useState, useEffect } from "react";
import { PageHeader, ListGroup, ListGroupItem, Jumbotron, Button } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

import Card from "../components/Card/Card.js";
import CardHeader from "../components/Card/CardHeader.js";
import CardBody from "../components/Card/CardBody.js";

import { cardTitle } from "../assets/jss/material-kit-react.js";

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
	  	<Jumbotron>
		  <h1>Hello, world!</h1>
		  <p>
		    This is a simple hero unit, a simple jumbotron-style component for calling
		    extra attention to featured content or information.
		  </p>
		  <p>
		    <Button bsStyle="primary">Learn more</Button>
		  </p>
		</Jumbotron>
    );
  }

  function renderProjects() {
    return (
      <div className="projects">
        <PageHeader>Your Projects</PageHeader>
        <ListGroup>
          {!isLoading && renderProjectsList(projects)}
        </ListGroup>
        <Card>
          <CardHeader color="danger">Featured</CardHeader>
		  <CardBody>
		  <h4 className={cardTitle}>Card Title</h4>
		    <p>This is some text within a card body.</p>
		  </CardBody>
		</Card>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderProjects() : renderLander()}
    </div>
  );
}