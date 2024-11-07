import React, { useState } from 'react';
import './WebsiteTypes.css';
import websiteTypesData from './websitedata.js';

const WebsiteTypes = () => {
  const [showAll, setShowAll] = useState(false);

  const handleToggle = () => setShowAll(!showAll);

  // Determine the websites to display based on `showAll`
  const displayedWebsites = showAll ? websiteTypesData : websiteTypesData.slice(0, 4);

  return (
    <div className="website-types">
      <h2>Types of Websites I Develop</h2>
      <div className="website-types-scrollable">
        {displayedWebsites.map((website, index) => (
          <div key={index} className="website-card">
            <h3>{website.type}</h3>
            <p><strong>Purpose:</strong> {website.purpose}</p>
            <p><strong>Examples:</strong> {website.examples}</p>
            <ul><strong>Features:</strong>
              {website.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <button onClick={handleToggle} className="view-more-btn">
        {showAll ? 'View Less' : 'View More'}
      </button>
    </div>
  );
};

export default WebsiteTypes;
