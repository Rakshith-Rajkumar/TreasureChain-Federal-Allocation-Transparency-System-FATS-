import React from 'react';
import Header from '../components/sections/Header';
import ChartSection from '../components/sections/ChartSection';
import DepartmentAllocationSection from '../components/sections/DepartmentAllocationSection';
import IRSTaxCollectionSection from '../components/sections/IRSTaxCollectionSection';
import FilingSeasonSection from '../components/sections/FilingSeasonSection';
import FinancialPositionSection from '../components/sections/FinancialPositionSection';
import RecentOperationsSection from '../components/sections/RecentOperationsSection';
import Footer from '../components/sections/Footer';
import TransactionList, { Transaction } from '../components/transactions/TransactionList';

interface TaxTreasuryPageProps {
  taxCollected: string;
  taxYear: string;
  asOfDate: string;
  nationalDebt: string;
  debtUpdateDate: string;
  transactions: Transaction[];
}

const TaxTreasuryPage: React.FC<TaxTreasuryPageProps> = ({
  taxCollected,
  taxYear,
  asOfDate,
  nationalDebt,
  debtUpdateDate,
  transactions,
}) => (
  <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-10 text-white">
    <div className="container mx-auto px-4">
      <Header taxYear={taxYear} />
      <ChartSection />
      <DepartmentAllocationSection />
      <IRSTaxCollectionSection taxCollected={taxCollected} />
      <FilingSeasonSection />
      <FinancialPositionSection asOfDate={asOfDate} nationalDebt={nationalDebt} />
      <RecentOperationsSection debtUpdateDate={debtUpdateDate} />
      <TransactionList transactions={transactions} />
      <Footer />
    </div>
  </div>
);

export async function getStaticProps() {
  // Fetch treasury static data (or from your CMS/API)
  const treasuryData = {
    taxCollected: "2.1",
    taxYear: "2022",
    asOfDate: "February 20, 2025",
    nationalDebt: "36.22",
    debtUpdateDate: "February 5, 2025",
  };

  const baseUrl = 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/transactions/data`);
  const json = await res.json();
  const transactions = json.data;

  return {
    props: {
      ...treasuryData,
      transactions,
    },
    revalidate: 1,
  };
}

export default TaxTreasuryPage;