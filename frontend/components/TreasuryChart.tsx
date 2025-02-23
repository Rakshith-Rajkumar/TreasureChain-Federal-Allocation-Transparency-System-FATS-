import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { motion } from 'framer-motion';
import { hoverEffect } from './animations';
import {
  Chart as ChartJS,
  TimeScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface DebtRecord {
  record_date: string;
  debt_held_public_amt: string;
  intragov_hold_amt: string;
  tot_pub_debt_out_amt: string;
}

const TreasuryChart: React.FC = () => {
  const [chartData, setChartData] = useState<{
    labels: Date[];
    datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      backgroundColor: string;
      tension: number;
      pointRadius: number;
    }[];
  } | null>(null);

  useEffect(() => {
    fetch(
      'https://api.fiscaldata.treasury.gov/services/api/fiscal_service/v2/accounting/od/debt_to_penny?sort=-record_date&format=json&page[number]=1&page[size]=10'
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        const records: DebtRecord[] = data.data;
        if (records && records.length > 0) {
          // Use the "Record Date" column as the x-axis label by converting them to Date objects
          const labels = records.map(record => new Date(record.record_date));
          // Convert string amounts to numbers and scale the amounts to trillions
          const debtHeldPublic = records.map(record =>
            parseFloat(record.debt_held_public_amt) / 1e12
          );
          const intragovHold = records.map(record =>
            parseFloat(record.intragov_hold_amt) / 1e12
          );
          const totPubDebt = records.map(record =>
            parseFloat(record.tot_pub_debt_out_amt) / 1e12
          );

          setChartData({
            labels,
            datasets: [
              {
                label: 'Debt Held Public (Trillions)',
                data: debtHeldPublic,
                fill: false,
                borderColor: 'rgba(244, 67, 54, 1)',
                backgroundColor: 'rgba(244, 67, 54, 0.2)',
                tension: 0.3,
                pointRadius: 5,
              },
              {
                label: 'Intragov Holdings (Trillions)',
                data: intragovHold,
                fill: true,
                borderColor: 'rgba(33, 150, 243, 1)',
                backgroundColor: 'rgba(33, 150, 243, 0.2)',
                tension: 0.3,
                pointRadius: 5,
              },
              {
                label: 'Total Public Debt Outstanding (Trillions)',
                data: totPubDebt,
                fill: true,
                borderColor: 'rgba(76, 175, 80, 1)',
                backgroundColor: 'rgba(76, 175, 80, 0.2)',
                tension: 0.3,
                pointRadius: 5,
              },
            ],
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching debt data:', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: '#fff',
          font: { size: 12 },
        },
      },
      title: {
        display: true,
        text: 'Debt to the Penny Trends (in Trillions)',
        color: '#fff',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day',
          tooltipFormat: 'MMM dd, yyyy',
        },
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
      y: {
        ticks: { color: '#fff' },
        grid: { color: 'rgba(255,255,255,0.2)' },
      },
    },
  };

  if (!chartData) {
    return <div className="text-white">Loading chart data...</div>;
  }

  return (
    <motion.div {...hoverEffect} className="bg-gray-800 rounded-xl shadow-lg p-6">
      <Line options={options} data={chartData} />
    </motion.div>
  );
};

export default TreasuryChart;