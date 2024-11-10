// src/components/AdsSidebar.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdsSidebar = () => {
  const [ads, setAds] = useState([]);

  useEffect(() => {
    axios.get('https://dummyjson.com/products?limit=4')
      .then(response => setAds(response.data.products))
      .catch(error => console.error("Error fetching ads:", error));
  }, []);

  return (
    <aside className="ads-sidebar">
      <h2>Sponsored Ads</h2>
      {ads.map(ad => (
        <div key={ad.id} className="ad-item">
          <img src={ad.thumbnail} alt={ad.title} />
          <h3>{ad.title}</h3>
          <p>{ad.description}</p>
        </div>
      ))}
    </aside>
  );
};

export default AdsSidebar;
