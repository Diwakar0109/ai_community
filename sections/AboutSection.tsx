import React from 'react';
import { motion } from 'framer-motion';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-20 md:py-32">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Who We Are
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 leading-relaxed"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          AI Innovators is a forward-thinking collective of engineers, data scientists, and researchers passionate about pushing the boundaries of artificial intelligence. We collaborate on challenging real-world problems, transforming complex data into tangible solutions that drive industry forward. Our work is grounded in a commitment to excellence, innovation, and ethical AI development. This showcase represents the pinnacle of our applied research and engineering efforts.
        </motion.p>
      </div>
    </section>
  );
};

export default AboutSection;