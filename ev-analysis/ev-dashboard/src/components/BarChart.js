import React, { useRef, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    colors.push(`hsl(${Math.random() * 360}, 100%, 75%)`);
  }
  return colors;
};

const EVBarChart = ({ data, title, dataKey, xAxisKey }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    return () => {
      // Cleanup function to destroy chart instance on component unmount
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, []);

  const colors = generateColors(data.length);

  const chartData = {
    labels: data.map(item => item[xAxisKey]),
    datasets: [{
      label: dataKey,
      data: data.map(item => item[dataKey]),
      backgroundColor: colors
    }]
  };

  const options = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true
      }
    }
  };

  return (
    <div>
      <h2>{title}</h2>
      <Bar ref={chartRef} data={chartData} options={options} />
    </div>
  );
};

export default EVBarChart;
