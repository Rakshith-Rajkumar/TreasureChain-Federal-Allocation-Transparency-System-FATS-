import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

const Footer: React.FC = () => (
  <motion.footer
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="text-center mt-10 text-gray-400"
  >
    <p>
      Debt per citizen: $108,141 | Average interest rate: 3.337% | Daily
      increase: $5.64 billion
    </p>
  </motion.footer>
);

export default Footer;