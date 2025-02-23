import React from 'react';
import { motion } from 'framer-motion';
import { fadeInUp } from '../animations';

interface RecentOperationsSectionProps {
  debtUpdateDate: string;
}

const RecentOperationsSection: React.FC<RecentOperationsSectionProps> = ({
  debtUpdateDate,
}) => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    className="mb-10"
  >
    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Recent Treasury Operations (As of {debtUpdateDate})
      </h2>
      <ul className="list-disc list-inside text-gray-300 space-y-2">
        <li>
          February 2025 bond issuance:{' '}
          <span className="font-semibold">$125B</span>
        </li>
        <li>
          30-year TIPS maintained at:{' '}
          <span className="font-semibold">$9B</span>
        </li>
        <li>
          Reverse repurchase agreements:{' '}
          <span className="font-semibold">$452B</span>
        </li>
      </ul>
    </div>
  </motion.section>
);

export default RecentOperationsSection;