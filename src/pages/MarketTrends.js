import axios from "axios";
import { useEffect } from "react";
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

const MarketTrends = () => {
    useEffect(() => {
        axios.get("http://localhost:8983/solr/snp500/select", {
            params : {
                // "fl": props.fetchFields,
                "q": "Date:[2013-07-17T00\\:00\\:00Z TO NOW]",
                "indent": true,
                "q.op": "OR",
                "rows" : 200
            }
        }).then(res => {
            console.log(res.data.response.docs);
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [])

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
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
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
        <div>
            <Line options={options} data={data} />;
        </div>
    )
}

export default MarketTrends; 

