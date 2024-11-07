// src/components/Carousel.jsx
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Carousel.css';
import image1 from '../assets/images/image1.webp'
import image2 from '../assets/images/image2.webp'

const CarouselComponent = () => (
  <div className="carousel">
    <Carousel showThumbs={false} autoPlay infiniteLoop>
      <div><img src={image1}  alt="Project 1" /></div>
      <div><img src={image2} alt="Project 2" /></div>
    </Carousel>
  </div>
);

export default CarouselComponent;
