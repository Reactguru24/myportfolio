// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from './components/MainLayout';
import './App.css'
import ProjectDetail from './components/ProjectDetail';

function App() {
  return (
   <div className="app">
     <Router>
      <Routes>
        <Route path="/" element={<MainLayout />} />
        <Route path="/projects/:projectId" element={<ProjectDetail />} />
        
      </Routes>
    </Router>
   </div>
  );
}

export default App;

