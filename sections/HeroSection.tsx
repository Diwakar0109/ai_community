
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const HeroSection: React.FC = () => {
  const heading = "AI Innovators: Shaping the Future with Data.".split(" ");

  const headingContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        // FIX: Add 'as const' to ensure TypeScript infers a literal type for 'spring', resolving the Variants type error.
        type: 'spring' as const,
        stiffness: 100,
      },
    },
  };
  
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <section id="home" ref={ref} className="min-h-screen flex items-center justify-center text-center px-4">
      <motion.div style={{ y }} className="max-w-4xl">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          variants={headingContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {heading.map((word, index) => (
            <motion.span key={index} className="inline-block mr-3" variants={wordVariants}>
              {word}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-gray-300 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          A collective of AI professionals showcasing cutting-edge industry projects.
        </motion.p>
        <motion.a 
          href="#projects" 
          className="inline-block bg-cyan-500 text-white font-bold text-lg py-3 px-8 rounded-full transition-all duration-300 hover:bg-cyan-400 shadow-[0_0_15px_rgba(0,255,255,0.6)]"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          // FIX: Add 'as const' to ensure TypeScript infers a literal type for 'spring', resolving a potential TargetAndTransition type error.
          transition={{ delay: 2, type: 'spring' as const }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0,255,255,0.8)" }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Our Work
        </motion.a>
      </motion.div>
    </section>
  );
};

export default HeroSection;
