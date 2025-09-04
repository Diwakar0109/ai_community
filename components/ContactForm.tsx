
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiLoader, FiCheck, FiX } from 'react-icons/fi';
import { useForm, ValidationError } from '@formspree/react'; // 1. Import Formspree hooks

// (InputField component from Step 2 goes here)
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
        className="peer w-full p-3 bg-gray-900 border-2 border-gray-700 rounded-md text-white focus:outline-none focus:border-cyan-500 transition-colors"
        placeholder={label}
        whileFocus={{ boxShadow: '0 0 0 2px #22d3ee' }}
        required
      />
      <label
        htmlFor={id}
        className={`absolute left-3 top-3.5 bg-gray-900 px-1 text-sm text-gray-400 transition-all pointer-events-none
          peer-placeholder-shown:text-base 
          peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-cyan-400`}
      >
        {label}
      </label>
    </div>
  );
};


const ContactForm: React.FC = () => {
  // 2. Initialize Formspree hook with your form ID
  const [state, handleSubmit] = useForm("xqadgqdv");

  // 3. Handle the success state by showing a thank you message
  if (state.succeeded) {
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

  // 4. Render the form, now controlled by Formspree
  return (
    <motion.form 
      onSubmit={handleSubmit} // Use Formspree's handleSubmit
      className="space-y-6"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      {/* Update InputFields to use 'name' and remove value/onChange */}
      <InputField id="name" label="Name" type="text" name="name" />
      <InputField id="email" label="Email" type="email" name="email" />
      <ValidationError 
        prefix="Email" 
        field="email"
        errors={state.errors}
        className="text-red-500 text-sm -mt-4"
      />

      <InputField id="message" label="Message" type="text" as="textarea" name="message" />
      <ValidationError 
        prefix="Message" 
        field="message"
        errors={state.errors}
        className="text-red-500 text-sm -mt-4"
      />
      
      <div className="text-center">
        <motion.button
          type="submit"
          disabled={state.submitting} // Use Formspree's submitting state
          className="w-full max-w-xs bg-cyan-500 text-white font-bold py-3 px-8 rounded-full transition-colors duration-300 hover:bg-cyan-400 disabled:bg-gray-600 flex items-center justify-center"
          whileHover={{ scale: !state.submitting ? 1.05 : 1 }}
          whileTap={{ scale: !state.submitting ? 0.95 : 1 }}
        >
          <AnimatePresence mode="wait">
            {state.submitting ? (
              <motion.div key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <FiLoader className="animate-spin" />
              </motion.div>
            ) : (
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
