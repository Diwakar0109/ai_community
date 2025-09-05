
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiCheck, FiX } from 'react-icons/fi';

// The InputField component remains the same. It's perfect.
const InputField: React.FC<{
  id: string;
  label: string;
  type: string;
  name: string;
  as?: 'textarea';
}> = ({ id, label, type, name, as }) => {
  const Component = as === 'textarea' ? motion.textarea : motion.input;
  return (
    <div className="relative">
      <Component
        id={id}
        name={name}
        type={type}
        rows={as === 'textarea' ? 5 : undefined}
        className="peer w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md text-white placeholder-transparent focus:outline-none focus:border-cyan-500 transition-colors"
        placeholder={label}
        whileFocus={{ boxShadow: '0 0 0 2px #22d3ee' }}
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-3.5 text-gray-400 text-base transition-all pointer-events-none
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400 peer-focus:px-1 peer-focus:bg-gray-900
          peer-[:not(:placeholder-shown)]:-top-2.5 peer-[:not(:placeholder-shown)]:text-sm peer-[:not(:placeholder-shown)]:text-cyan-400 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:bg-gray-900`}
      >
        {label}
      </label>
    </div>
  );
};

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

const ContactForm: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('https://formsubmit.co/ajax/aicommunitybit@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
      // UX Improvement: Reset the form state after an error so the user can try again
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  if (status === 'success') {
    return (
      <motion.div
        className="text-center p-10 bg-gray-900 rounded-lg border-2 border-cyan-500"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <FiCheck className="text-5xl text-cyan-400 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white">Thank you!</h3>
        <p className="text-gray-400 mt-2">Your message has been sent successfully.</p>
      </motion.div>
    );
  }

  return (
    <motion.form 
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <InputField id="name" label="Name" type="text" name="name" />
      <InputField id="email" label="Email" type="email" name="email" />
      <InputField id="message" label="Message" type="text" as="textarea" name="message" />
      
      <div className="text-center">
        <motion.button
          type="submit"
          disabled={status === 'sending'}
          className="w-full max-w-xs bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-cyan-400 disabled:bg-gray-600 flex items-center justify-center"
          whileHover={{ scale: status !== 'sending' ? 1.05 : 1 }}
          whileTap={{ scale: status !== 'sending' ? 0.95 : 1 }}
        >
          <AnimatePresence mode="wait">
            {status === 'sending' && (
              <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FiLoader className="animate-spin" />
              </motion.div>
            )}
            {status === 'error' && (
              <motion.div key="error" initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} className="flex items-center gap-2">
                <FiX /> Error
              </motion.div>
            )}
            {/* --- THIS IS THE FIX --- */}
            {/* The button text should only show when the form is idle. */}
            {status === 'idle' && (
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
