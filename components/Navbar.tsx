
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { DiAtom } from 'react-icons/di';

const NavLink: React.FC<{ href: string; children: React.ReactNode }> = ({ href, children }) => {
  return (
    <a href={href} className="relative group text-gray-300 hover:text-white transition-colors duration-300">
      {children}
      <motion.span
        className="absolute bottom-0 left-0 w-full h-0.5 bg-cyan-400 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"
      />
    </a>
  );
};


const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });
  
  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#projects', label: 'Projects' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      animate={{
        backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
        backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.7)' : 'rgba(10, 10, 10, 0)',
        boxShadow: isScrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-2 text-2xl font-bold text-white">
          <DiAtom className="text-cyan-400 text-3xl" />
          <span>AI Innovators</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink key={link.href} href={link.href}>{link.label}</NavLink>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
