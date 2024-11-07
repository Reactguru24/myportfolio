// src/App.jsx
import React from 'react';
import Navbar from './Navbar';
import PortfolioCarousel from './Carousel';
import AdsSidebar from './AdsSidebar';
import WorkGallery from './WorkGallery';
import Testimonials from './Testimonials';
import PortfolioInfo from './PortfolioInfo';
import Footer from './Footer';
import './MainLayout.css';
import Button from './Button';
import WebsiteTypes from './WebsiteTypes';
import ContactUs from './ContactUs';

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <div className="subNavbar">
        <div className="portfolio-info">
          <PortfolioInfo />
        </div>
        <div className="portfolio-carousel">
          <PortfolioCarousel />
        </div>
      </div>
      <div className="main-content">
        <div className="content">
        <main>
          <WebsiteTypes/>
          <WorkGallery />
          <Testimonials />
          <ContactUs /> 
        </main>
      </div>
      
      <Footer />
    </div>
    </div>
  );
};

export default App;
