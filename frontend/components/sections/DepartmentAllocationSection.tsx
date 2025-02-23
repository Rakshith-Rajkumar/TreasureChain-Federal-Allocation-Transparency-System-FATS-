import React from 'react';
import { motion } from 'framer-motion';
import DepartmentAllocationForm from '../DepartmentAllocationForm';
import { fadeInUp } from '../animations';

const DepartmentAllocationSection: React.FC = () => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={fadeInUp}
    transition={{ delay: 0.45, duration: 0.5 }}
    className="mb-10"
  >
    <div className="bg-gray-800 rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-primary mb-4">
        Departmental Fund Allocation
      </h2>
      <DepartmentAllocationForm />
    </div>
  </motion.section>
);

export default DepartmentAllocationSection;