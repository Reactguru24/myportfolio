import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProjectDetail = () => {
  const { projectId } = useParams();  // Get the project ID from the URL
  const [project, setProject] = useState(null); // State for storing project details
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error handling

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/items/${projectId}`);
        setProject(response.data);
        setLoading(false);
      } catch (err) {
        setError('Coming soon');
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);  // Re-run the effect when projectId changes

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="project-detail">
      {project && (
        <>
          <h2>{project.title}</h2>
          <img src={`http://localhost:5000/uploads/${project.image}`} alt={project.title} />
          <p>{project.description}</p>
          {/* Add more details about the project as needed */}
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
