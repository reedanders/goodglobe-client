import React, { useState, useEffect } from 'react';
import { onError } from "../../libs/errorLib";
import { API } from "aws-amplify";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import ProjectCard from '../ProjectCard';

import idea_plant from "../../assets/images/drawings/idea_plant.png"
import Biodiversity from "../../assets/icons/biodiversity.png"
import Habitat from "../../assets/icons/habitat.png"
import Air from "../../assets/icons/air.png"
import Waste from "../../assets/icons/waste.png"
import Water from "../../assets/icons/water.png"
import Resilience from "../../assets/icons/resilience.png"
import Mitigation from "../../assets/icons/mitigation.png"
import Awareness from "../../assets/icons/awareness.png"
import Knowledge from "../../assets/icons/knowledge.png"

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
    minHeight:"65vh"
  },
  categoryPaper: {
  	position: 'relative',
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
  },
  categoryGrid:{
  	padding: theme.spacing(4),
  },
  categoryMedia: {
  	width: '80%',
  },
  categoryMainTitle: {
  	color: theme.palette.common.black,
  	paddingTop: theme.spacing(2),
  },
  categoryTitle: {
  	color: theme.palette.common.black,
  },
  media: {
    width: '100%',
  },
}));


const icons = [
  {
    title: 'Biodiversity',
    image: Biodiversity,
    attribution: "relationship by Nithinan Tatah from the Noun Project",
  },
  {
    title: 'Habitat',
    image: Habitat,
    attribution: "wildlife by Nithinan Tatah from the Noun Project",
  },
  {
    title: 'Air',
    image: Air,
    attribution: "Air by Lars Meiertoberens from the Noun Project",
  },
  {
    title: 'Waste',
    image: Waste,
    attribution: "plastic mountain by supalerk laipawat from the Noun Project",
  },
  {
    title: 'Water',
    image: Water,
    attribution: "Water by Fernanddo Santtander from the Noun Project",
  },
  {
    title: 'Resilience',
    image: Resilience,
    attribution: "Resilience by Attilio Baghino from the Noun Project",
  },
  {
    title: 'Mitigation',
    image: Mitigation,
    attribution: "heat wave by Wichai Wi from the Noun Project",
  },
  {
    title: 'Awareness',
    image: Awareness,
    attribution: "Awareness by Nithinan Tatah from the Noun Project",
  },
  {
    title: 'Knowledge',
    image: Knowledge,
    attribution: "Learning by Flatart from the Noun Project",
  },
];

export default function Discover() {
	const classes = useStyles();
	const [projects, setProjects] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
	async function onLoad() {

	  try {
	    const projects = await loadProjects();
	    if (projects) {
	      setProjects(projects);
	    }
	  } catch (e) {
	    console.log(e);
	    onError(e);
	  }

	  setIsLoading(false);
	}

	onLoad();
	}, []);

	function loadProjects() {
		return API.get("goodglobe", "/projects");
	};

	return (
    <div className="Discover">
      <Container maxWidth="md" className={classes.header}>
	      <Grid container direction="column" >
	      	<Grid item>
	      		<Typography component="h3" variant="h3" align="left" color="textPrimary" gutterBottom>
	      		Browse projects
	      		</Typography>
	      	</Grid>
	      	<Grid item>
	      		<Typography component="h6" variant="h6" align="left" gutterBottom>
	      		Environmental stewards are raising money for projects they are passonate about.
	      		</Typography>
	      	</Grid>
	      </Grid>
      </Container>

	  <Container className={classes.cardGrid} maxWidth="md">
		  {isLoading ? <Grid container justify="center" alignItems="center"><Grid item><CircularProgress /></Grid></Grid> : ''}
		<Grid container spacing={4}>
		  {projects.map((project) => (
		    <Grid item key={project.projectId} xs={12} sm={6} md={4}>
		      <ProjectCard project={project}/>
		    </Grid>
		  ))}
		</Grid>
	  </Container>      

      <Paper className={classes.categoryPaper} >
      <Typography variant="h5" component="h5" align="center" className={classes.categoryMainTitle}>Browse projects by category</Typography>
	      <Grid container spacing={4} justify="center" alignItems="center" className={classes.categoryGrid}>
	        {icons.map((card) => (
	          <Grid item key={card.title} xs={6} sm={3} md={2} alignItems="center">
                <img src={card.image} alt={card.attribution} className={classes.categoryMedia}/>
                <Typography variant="h6" component="h6" align="center" className={classes.categoryTitle}>
                  {card.title} 
                </Typography>
	          </Grid>
	        ))}
	      </Grid>
	    </Paper>

      <Container maxWidth="md" className={classes.cardGrid}>
	      <Grid container>
	      	<Grid item container md={7} direction="column" justify="center">
	      		<Grid item>
	      			<Typography component="h2" variant="h4" align="left" color="textPrimary" gutterBottom>
		      		Grassroots Funding for Conservation
		      		</Typography>
	      		</Grid>
	      		<Grid item>
	      			<Typography component="p" variant="body1" align="left" color="textPrimary" gutterBottom>
		      		Let's get you started! We're building a simple, efficient process for experienced 
		      		conservation practitioners to get funding for conservation projects. Here's how it works.
		      		</Typography>
	      		</Grid>
	      		<Grid item>
		      		<Button href="" size="small" color="primary">
			          Start a Project!
			        </Button>
			        <Button href="" size="small">
			          Learn more
			        </Button>
		        </Grid>
	      	</Grid>
	      	<Grid item md={5}>
	      		<img src={idea_plant} alt="idea watering plant" className={classes.media}/>
	      	</Grid>
	      </Grid>
      </Container>

    </div>
  );
}