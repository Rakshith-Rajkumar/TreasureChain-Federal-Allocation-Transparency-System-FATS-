import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

interface IRSTaxCollectionSectionProps {
  taxCollected: string;
}

const IRSTaxCollectionSection: React.FC<IRSTaxCollectionSectionProps> = ({ taxCollected }) => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="mb-10"
  >
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between items-center">
      <div className="mb-6 md:mb-0 text-center md:text-left">
        <h2 className="text-2xl font-bold text-primary">
          IRS Tax Collection Data
        </h2>
        <p className="mt-2 text-gray-400">
          Source: IRS 2022 Data (Updated December 11, 2024)
        </p>
      </div>
      <div className="text-center">
        <p className="text-5xl font-extrabold text-blue-400">${taxCollected}T</p>
        <p className="text-sm text-gray-400 mt-1">Trillion</p>
      </div>
    </div>
  </motion.section>
);

export default IRSTaxCollectionSection;