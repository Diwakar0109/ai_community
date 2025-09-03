
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onCardClick: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading, error, onCardClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Our Portfolio
        </motion.h2>
        
        {loading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {projects.map(project => (
              <motion.div key={project.id} variants={itemVariants}>
                <ProjectCard project={project} onCardClick={onCardClick} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
