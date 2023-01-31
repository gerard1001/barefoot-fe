/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
/* eslint-disable react/prop-types */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export const BarChart = ({ chartData }) => (
  <Bar
    style={{
      backgroundColor: '#F2F2F2',
      padding: '10px',
      minHeight: '300px',
      minWidth: '100%',
    }}
    data={chartData}
    options={{
      plugins: {
        title: {
          display: true,
          text: 'Requester Stats',
        },
        legend: {
          display: true,
          position: 'top',
        },
      },
    }}
    width={100}
    height={40}
  />
);
