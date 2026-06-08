import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './composants/Navbar';
import Footer from './composants/Footer';
import Home from './composants/Home';
import Dossier from './composants/Dossier';
import Contact from './composants/Contact';
import Portfolio from './composants/Portfolio';
import ProjectDetails from './composants/ProjectDetails';
import Login from './composants/Login';
import About from './composants/About';
import CV from './composants/CV';
import './App.css';

function App() {
  useEffect(() => {
    const handleMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <Router>
      <div className="app">
        <div className="aurora-bg"></div>
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/projet/:id" element={<ProjectDetails />} />
            <Route path="/admin" element={<Dossier />} />
            <Route path="/login" element={<Login />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cv" element={<CV />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
