
import React, { useState, useEffect } from 'react'; // 1. Import useEffect
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '../types';
import ProjectCard from '../components/ProjectCard';

interface ProjectsSectionProps {
  projects: Project[];
  loading: boolean;
  error: string | null;
  onCardClick: (project: Project) => void;
}

const ProjectsSection: React.FC<ProjectsSectionProps> = ({ projects, loading, error, onCardClick }) => {
  const categories = Array.from(new Set(projects.map(p => p.category)));

  // 2. Initialize state to null. This is its state before projects have loaded.
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // 3. Use an effect to set the default category once projects are loaded.
  useEffect(() => {
    // This effect runs whenever the 'categories' array changes.
    // We check if a category isn't already selected AND if categories are now available.
    if (!selectedCategory && categories.length > 0) {
      // If so, we set the selected category to the very first one.
      setSelectedCategory(categories[0]);
    }
  }, [categories, selectedCategory]); // Dependency array ensures this runs at the right time

  // The filter logic now safely handles the initial `null` state
  const filteredProjects = selectedCategory
    ? projects.filter(project => project.category === selectedCategory)
    : []; // Show nothing until a category is selected

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -30, transition: { duration: 0.3 } },
  };

  return (
    <section id="projects" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Deployed Projects
        </motion.h2>

        {!loading && !error && (
          <div className="flex justify-center flex-wrap gap-4 mb-16">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-5 py-2 text-sm font-semibold rounded-full transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}
        
        {loading && <p className="text-center">Loading projects...</p>}
        {error && <p className="text-center text-red-500">Error: {error}</p>}
        
        {!loading && !error && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            key={selectedCategory}
          >
            <AnimatePresence>
              {filteredProjects.map(project => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <ProjectCard project={project} onCardClick={onCardClick} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;
