import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './WorkGallery.css';

const WorkGallery = () => {
  const [projects, setProjects] = useState([]); // State to store the fetched projects
  const [loading, setLoading] = useState(true); // State for loading indicator
  const [error, setError] = useState(null); // State for error handling

  // Fetch project data from the backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/items');
        setProjects(response.data); // Assuming the API returns an array of projects
        setLoading(false);
      } catch (err) {
        setError('Error fetching projects');
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  // Function to truncate text to a certain number of words
  const truncateText = (text, wordLimit) => {
    const words = text.split(" ");
    return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  };

  // Loading and error handling
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="work-gallery" id="projects">
      <h2>Projects</h2>

      <div className="gallery">
        {projects.map((project) => (
          <div key={project._id} className="project-card">
            <Link to={`/projects/${project._id}`}>
              {/* Modify the image src to use port 3000 */}
              <img 
                src={`http://localhost:3000${project.images[0]}`} 
                alt={project.title} 
              />
              <h3>{project.title}</h3>
              <p>{truncateText(project.description, 10)}</p> {/* Truncate to 10 words */}
              <button className="preview-button">Preview</button> {/* Preview button */}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkGallery;
