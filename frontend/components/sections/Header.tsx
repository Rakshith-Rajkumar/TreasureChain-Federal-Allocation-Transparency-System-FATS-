import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

interface HeaderProps {
  taxYear: string;
}

const Header: React.FC<HeaderProps> = ({ taxYear }) => (
  <motion.header
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="mb-10 text-center"
  >
    <h1 className="text-4xl font-extrabold text-primary">
      U.S. Tax & Treasury Dashboard
    </h1>
    <p className="mt-2 text-lg text-gray-400">Tax Year: {taxYear}</p>
  </motion.header>
);

export default Header;