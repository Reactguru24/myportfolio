import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // Import Link from react-router-dom
import './WorkGallery.css';

const WorkGallery = () => {
  const [projects, setProjects] = useState([]); // State to store projects
  const [loading, setLoading] = useState(true); // State for loading state
  const [error, setError] = useState(null); // State to handle errors

  // Fetch projects data from API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items'); // Fetch data from backend
        setProjects(response.data); // Store projects in state
        setLoading(false); // Stop loading when data is fetched
      } catch (err) {
        setError('Failed to load projects'); // Set error message if request fails
        setLoading(false); // Stop loading
      }
    };

    fetchProjects();
  }, []); // Empty dependency array to run once on component mount

  if (loading) {
    return <div>Loading...</div>; // Display loading text while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Display error message if the request fails
  }

  return (
    <div className="work-gallery" id="projects">
      <h2>Projects</h2>
      <div className="gallery">
        {projects.map((project) => (
          <div className="project-card" key={project._id}>
            <Link to={`/projects/${project._id}`}>
              <img src={`http://localhost:5000/uploads/${project.image}`} alt={project.title} />
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGallery;
