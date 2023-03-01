import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const StockTrendsChart = ({startDate, endDate, stockData}) => {
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );
      
    const options = {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom',
          },
          title: {
            display: true,
            text: `S&P 500 index from ${startDate} to ${endDate}`,
            font: {
              size : 20,
            },
            color: 'black'
          },
        },
        aspectRatio : 5,
      };
      
    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
      
    const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Dataset 2',
            data: [
                {x: 10, y: 20}, {x: 15, y: 15}, {x: 20, y: 10}
            ],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    return (
      <Line options={options} data={data} />
    )
}

export default StockTrendsChart; 

