
import React, { useState, useEffect, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Project } from './types';
import Navbar from './components/Navbar';
import HeroSection from './sections/HeroSection';
import ProjectsSection from './sections/ProjectsSection';
import AboutSection from './sections/AboutSection';
import ContactSection from './sections/ContactSection';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import ChatbotWidget from './components/ChatbotWidget';
import AnimatedBackground from './components/AnimatedBackground';

const App: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const response = await fetch('/projects.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data: Project[] = await response.json();
        setProjects(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = useCallback((project: Project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  return (
    <div className="isolate text-gray-200 font-sans antialiased">
      <AnimatedBackground />
      <Navbar />
      <main className="relative z-10">
        <HeroSection />
        <ProjectsSection projects={projects} loading={loading} error={error} onCardClick={handleCardClick} />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotWidget />
      
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;