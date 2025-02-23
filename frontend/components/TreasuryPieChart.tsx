import React, { useState, useEffect } from 'react';
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

interface DataRecord {
  // This record uses a different structure – each record has a date field and many agency keys.
  record_calendar_year__record_calendar_month: string;
  [agency: string]: string | number;
}

const TreasuryPieChart: React.FC = () => {
  const [chartData, setChartData] = useState<{ datasets: any[] } | null>(null);

  useEffect(() => {
    fetch('/api/transactions/debtdata')
      .then((res) => res.json())
      .then((data) => {
        console.log('Fetched data:', data);
        // Expecting data.data to be an array of records
        const records: DataRecord[] = data.data;
        if (records && records.length > 0) {
          // Group data points by agency.
          const agencyData: { [agency: string]: { x: Date; y: number }[] } = {};
          records.forEach((record) => {
            // Parse the date from the record's date field.
            const dateString = record["record_calendar_year__record_calendar_month"];
            const date = new Date(dateString);
            // For every key (except the date field), add the data point.
            Object.keys(record).forEach((key) => {
              if (key === "record_calendar_year__record_calendar_month") return;
              const value = record[key];
              // Ensure we treat the value as a number.
              const amount = typeof value === "number" ? value : parseFloat(value as string);
              // Scale to billions.
              const scaledAmount = amount / 1e9;
              if (!agencyData[key]) {
                agencyData[key] = [];
              }
              agencyData[key].push({ x: date, y: scaledAmount });
            });
          });
          // Sort each agency's data points by date.
          Object.keys(agencyData).forEach((agency) => {
            agencyData[agency].sort((a, b) => a.x.getTime() - b.x.getTime());
          });
          // Define a color palette.
          const lineColors = [
            'rgba(244, 67, 54, 1)',
            'rgba(33, 150, 243, 1)',
            'rgba(76, 175, 80, 1)',
            'rgba(255, 193, 7, 1)',
            'rgba(156, 39, 176, 1)',
            'rgba(0, 188, 212, 1)',
            'rgba(255, 87, 34, 1)',
            'rgba(63, 81, 181, 1)',
          ];
          // Create one dataset per agency.
          const datasets = Object.keys(agencyData).map((agency, index) => ({
            label: agency,
            data: agencyData[agency],
            fill: false,
            borderColor: lineColors[index % lineColors.length],
            backgroundColor: lineColors[index % lineColors.length],
            tension: 0.3,
            pointRadius: 3,
          }));
          setChartData({ datasets });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        labels: { color: '#fff', font: { size: 12 } },
      },
      title: {
        display: true,
        text: 'Eligible Debt Trends by Agency (Billions)',
        color: '#fff',
      },
    },
    scales: {
      x: {
        type: 'time',
        time: { unit: 'month', tooltipFormat: 'MMM yyyy' },
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
      <div className="text-center text-xs text-gray-400 mt-4">
        120 Day Delinquent Debt Referral Compliance Report, retrieved from Fiscal Data
        <br />
        <a
          href="https://fiscaldata.treasury.gov/datasets/delinquent-debt-referral-compliance/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-200"
        >
          https://fiscaldata.treasury.gov/datasets/delinquent-debt-referral-compliance/
        </a>
        , Feb 23, 2025
      </div>
    </motion.div>
  );
};

export default TreasuryPieChart;