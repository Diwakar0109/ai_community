
import React from 'react';
import { motion } from 'framer-motion';
import ContactForm from '../components/ContactForm';

const ContactSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 md:py-32">
       <div className="container mx-auto px-6 max-w-3xl">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-center mb-12 text-white"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Get In Touch
        </motion.h2>
        <ContactForm />
      </div>
    </section>
  );
};

export default ContactSection;
