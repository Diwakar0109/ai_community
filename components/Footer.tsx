import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiInstagram, FiLinkedin, FiTwitter, FiYoutube } from 'react-icons/fi';
import { FaXTwitter } from "react-icons/fa6";

const Footer: React.FC = () => {
  return (
    <motion.footer 
      className="py-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 text-center text-gray-400">
        <div className="flex justify-center gap-6 mb-4">
          <a href="https://www.linkedin.com/in/ai-community/" className="hover:text-cyan-400 transition-colors"><FiLinkedin size={24} /></a>
          <a href="https://www.instagram.com/aicommunity_bit/" className="hover:text-cyan-400 transition-colors"><FiInstagram size={24} /></a>
          <a href="#" className="hover:text-cyan-400 transition-colors"><FaXTwitter size={24} /></a>
          <a href="https://www.youtube.com/@AICommunitybit" className="hover:text-cyan-400 transition-colors"><FiYoutube size={24} /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} AI Innovators. All Rights Reserved.</p>
        <p className="text-sm mt-2">Crafted with passion by the AI Innovators community.</p>
      </div>
    </motion.footer>
  );
};

export default Footer;