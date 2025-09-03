
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiCheck, FiX } from 'react-icons/fi';

type FormState = 'idle' | 'sending' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formState, setFormState] = useState<FormState>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('sending');
    // Simulate API call
    setTimeout(() => {
      if (name && email && message) {
        setFormState('success');
      } else {
        setFormState('error');
      }
    }, 2000);
  };

  const InputField: React.FC<{
    id: string;
    label: string;
    type: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    as?: 'textarea';
  }> = ({ id, label, type, value, onChange, as }) => {
    const Component = as === 'textarea' ? motion.textarea : motion.input;
    return (
      <div className="relative">
        <Component
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          rows={as === 'textarea' ? 5 : undefined}
          className="w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-cyan-500 transition-colors"
          placeholder={label}
          whileFocus={{ boxShadow: '0 0 0 2px #22d3ee' }}
        />
        <label
          htmlFor={id}
          className={`absolute left-3 -top-2.5 bg-gray-900 px-1 text-sm text-gray-400 transition-all
            ${value ? 'opacity-100' : 'opacity-0'} peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400`}
        >
          {label}
        </label>
      </div>
    );
  };


  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <InputField id="name" label="Name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <InputField id="email" label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField id="message" label="Message" type="text" as="textarea" value={message} onChange={(e) => setMessage(e.target.value)} />
      
      <div className="text-center">
        <motion.button
          type="submit"
          className="w-full max-w-xs bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-cyan-400 disabled:bg-gray-600 flex items-center justify-center"
          disabled={formState === 'sending'}
          whileHover={{ scale: formState === 'idle' ? 1.05 : 1 }}
          whileTap={{ scale: formState === 'idle' ? 0.95 : 1 }}
        >
          <AnimatePresence mode="wait">
            {formState === 'sending' && (
              <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FiLoader className="animate-spin" />
              </motion.div>
            )}
            {formState === 'success' && (
              <motion.div key="success" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                <FiCheck /> Sent!
              </motion.div>
            )}
             {formState === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                <FiX /> Error!
              </motion.div>
            )}
            {formState === 'idle' && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                Send Message
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </motion.form>
  );
};

export default ContactForm;
