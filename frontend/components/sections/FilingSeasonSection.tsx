import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

const FilingSeasonSection: React.FC = () => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="mb-10"
  >
    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        2025 Filing Season (As of Feb 14, 2025)
      </h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>
          Returns processed: <span className="font-semibold">32.82 million</span>
        </li>
        <li>
          Average refund: <span className="font-semibold">$2,169</span>
        </li>
        <li>
          E-filed returns: <span className="font-semibold">96% of total</span>
        </li>
      </ul>
    </div>
  </motion.section>
);

export default FilingSeasonSection;