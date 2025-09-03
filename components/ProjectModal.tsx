
import React from 'react';
import { motion } from 'framer-motion';
import { Project } from '../types';
import { FiX, FiGithub, FiFileText } from 'react-icons/fi';

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    // FIX: Corrected Framer Motion transition type inference issue by specifying 'spring' as a const.
    visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring' as const, stiffness: 250, damping: 25 } },
    exit: { opacity: 0, scale: 0.8, y: -50, transition: { duration: 0.3 } },
  };
  
  const LinkIcon = project.link.type === 'github' ? FiGithub : FiFileText;

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm p-4"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={onClose}
    >
      <motion.div
        className="relative w-full max-w-4xl max-h-[90vh] bg-[#18181b] rounded-lg shadow-2xl overflow-y-auto flex flex-col"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="aspect-video">
          <iframe
            src={project.video_url}
            title={project.topic}
            className="w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-4">{project.topic}</h2>
          <p className="text-gray-300 mb-6">{project.short_description}</p>
          <a
            href={project.link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-cyan-500 text-white font-bold py-2 px-6 rounded-full transition-all duration-300 hover:bg-cyan-400"
          >
            <LinkIcon className="text-xl" />
            <span>{project.link.type === 'github' ? 'View on GitHub' : 'View Document'}</span>
          </a>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
        >
          <FiX size={24} />
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
