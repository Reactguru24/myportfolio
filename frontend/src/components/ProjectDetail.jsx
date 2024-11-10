import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/items/${projectId}`);
        const fetchedProject = response.data;

        if (fetchedProject) {
          // Map image paths to include the full backend URL
          const imagesWithFullPath = fetchedProject.images.map(
            (image) => `http://localhost:3000${image}`
          );
          setProject({ ...fetchedProject, images: imagesWithFullPath });
          setMainImage(imagesWithFullPath[1] || imagesWithFullPath[0]);
          setLoading(false);
        } else {
          setError('Project not found');
          setLoading(false);
        }
      } catch (err) {
        setError('Error fetching project details');
        setLoading(false);
      }
    };

    fetchProjectDetails();
  }, [projectId]);

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
          <div className="side-images">
            {project.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} side ${index + 1}`}
                className="side-image"
                onClick={() => setMainImage(image)}
              />
            ))}
          </div>

          <div className="main-image">
            <img src={mainImage} alt={project.title} />
          </div>

          <div className="project-info">
            <p>{project.description}</p>
            <h2><span className="label">Title: </span> {project.title}</h2>
            <h2><span className="label">Type: </span> {project.type}</h2>
            <h2><span className="label">Language: </span> {project.language}</h2>
            <h2><span className="label">Framework: </span> {project.framework}</h2>
            <h2><span className="label">Features: </span> {project.feature}</h2>
            <a href={project.website} target="_blank" rel="noopener noreferrer">Visit Website</a>
          </div>
        </>
      )}
    </div>
  );
};

export default ProjectDetail;
