import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

interface FinancialPositionSectionProps {
  asOfDate: string;
  nationalDebt: string;
}

const FinancialPositionSection: React.FC<FinancialPositionSectionProps> = ({
  asOfDate,
  nationalDebt,
}) => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="mb-10"
  >
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col md:flex-row md:justify-between items-center">
      <div className="text-center md:text-left mb-6 md:mb-0">
        <h2 className="text-2xl font-bold text-primary">
          Treasury Financial Position
        </h2>
        <p className="mt-1 text-gray-400">Last update: {asOfDate}</p>
      </div>
      <div className="text-center">
        <p className="text-5xl font-extrabold text-red-400">${nationalDebt}T</p>
        <p className="text-sm text-gray-400 mt-1">National Debt</p>
      </div>
    </div>
  </motion.section>
);

export default FinancialPositionSection;