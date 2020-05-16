import React, { useState, useEffect } from "react";
import { useAppContext } from "../libs/contextLib";
import { onError } from "../libs/errorLib";
import { API } from "aws-amplify";
import { LinkContainer } from "react-router-bootstrap";
import "./Home.css";

import { 
	MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,
	MDBListGroupItem, MDBListGroup, MDBJumbotron } from 'mdbreact';


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
	        <MDBListGroupItem>
	          <div className="d-flex w-100 justify-content-between">
		        <h5 className="mb-1">{project.content.trim().split("\n")[0]}</h5>
		      </div>
	          {"Created: " + new Date(project.createdAt).toLocaleString()}
	        </MDBListGroupItem>
	      </LinkContainer>
	    ) : (
	      <LinkContainer key="new" to="/projects/new">
	        <MDBListGroupItem>
	          <h4>
	            <b>{"\uFF0B"}</b> Create a new project
	          </h4>
	        </MDBListGroupItem>
	      </LinkContainer>
	    )
	  );
	}

  function renderLander() {
    return (
	  	<MDBJumbotron>
		  <h1>Hello, world!</h1>
		  <p>
		    This is a simple hero unit, a simple jumbotron-style component for calling
		    extra attention to featured content or information.
		  </p>
		  <p>
		    <MDBBtn bsStyle="primary">Learn more</MDBBtn>
		  </p>
		</MDBJumbotron>
    );
  }

  function renderProjects() {
    return (
      <div className="projects">
        <h1>Your Projects</h1>
        <MDBListGroup>
          {!isLoading && renderProjectsList(projects)}
        </MDBListGroup>
      </div>
    );
  }

  return (
    <div className="Home">
      {isAuthenticated ? renderProjects() : renderLander()}
    </div>
  );
}