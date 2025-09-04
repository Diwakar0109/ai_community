
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Project } from '../types';
import { FiArrowRight } from 'react-icons/fi';

interface ProjectCardProps {
  project: Project;
  onCardClick: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onCardClick }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);

  return (
    <motion.div
      ref={ref}
      className="relative rounded-lg overflow-hidden cursor-pointer h-full flex flex-col bg-[#1a1a1a] border border-gray-800 shadow-lg"
      onClick={() => onCardClick(project)}
      whileHover={{
        scale: 1.03,
        boxShadow: '0px 10px 30px rgba(0, 200, 255, 0.2)',
      }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="relative overflow-hidden aspect-[16/9]">
        <motion.img 
          src={project.thumbnail_url} 
          alt={project.topic} 
          className="w-full h-full object-cover"
          style={{ y, scale: 1.2 }}
          whileHover={{ scale: 1.3 }}
          transition={{ duration: 0.4 }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
           <div className="text-white text-lg font-bold flex items-center gap-2">
            View Project <FiArrowRight />
           </div>
        </div>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-bold text-white mb-2">{project.topic}</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map(tag => (
            <span key={tag} className="text-xs font-semibold bg-gray-700 text-cyan-300 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <p className="text-gray-400 text-sm flex-grow">{project.short_description}</p>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
