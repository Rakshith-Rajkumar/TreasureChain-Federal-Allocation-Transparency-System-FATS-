import React from 'react';

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  status: string;
  transactionDateTime: string;
  currency: string;
  categoryId: string;
}

interface TransactionListProps {
  transactions: Transaction[];
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions }) => {
  return (
    <div className="bg-gray-800 rounded-xl shadow-lg p-6 my-8">
      <h2 className="text-2xl font-bold text-primary mb-4">Transactions</h2>
      <table className="min-w-full text-white">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Category</th>
            <th className="px-4 py-2 text-left">Amount</th>
            <th className="px-4 py-2 text-left">Status</th>
            <th className="px-4 py-2 text-left">Date/Time</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-t border-gray-700">
              <td className="px-4 py-2">{txn.id}</td>
              <td className="px-4 py-2">{txn.category}</td>
              <td className="px-4 py-2">
                {new Intl.NumberFormat('en-US', { style: 'currency', currency: txn.currency }).format(txn.amount)}
              </td>
              <td className="px-4 py-2">{txn.status}</td>
              <td className="px-4 py-2">{txn.transactionDateTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionList;