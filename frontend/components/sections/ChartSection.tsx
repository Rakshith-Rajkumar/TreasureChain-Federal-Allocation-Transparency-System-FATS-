import React from 'react';
import { motion } from 'framer-motion';
import TreasuryChart from '../TreasuryChart';
import TreasuryPieChart from '../TreasuryPieChart';
import { containerVariants, fadeInUp } from '../animations';

const ChartSection: React.FC = () => (
  <motion.section
    initial="initial"
    whileInView="animate"
    viewport={{ once: true, amount: 0.5 }}
    variants={containerVariants}
    className="mb-10 grid gap-10 md:grid-cols-2"
  >
    <motion.div variants={fadeInUp}>
      <TreasuryChart />
    </motion.div>
    <motion.div variants={fadeInUp}>
      <TreasuryPieChart />
    </motion.div>
  </motion.section>
);

export default ChartSection;