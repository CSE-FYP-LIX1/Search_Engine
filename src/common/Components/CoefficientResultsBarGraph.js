import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from 'highcharts/highcharts-more';
import HCSolidGauge from 'highcharts/modules/solid-gauge';

HCMore(Highcharts);
HCSolidGauge(Highcharts);

export const CoefficientResultsBarGraph = ({top10Corr, bot10Corr, handleBarClick}) => {
    let data = []; 

    top10Corr && top10Corr.forEach((elem) => {
        data.push({name: elem.Keyword[0], value: Number.parseFloat(elem.corr_coeff[0].toFixed(3))})
        
    }) 

    bot10Corr && bot10Corr.slice().reverse().forEach((elem) => {
        data.push({name: elem.Keyword[0], value: Number.parseFloat(elem.corr_coeff[0].toFixed(3))})
    })

    console.log(data); 
    const [chartOptions, setChartOptions] = useState({});

    useEffect(() => {
        const maxAbsValue = Math.ceil(Math.max(...data.map(item => Math.abs(item.value))));
        const colors = ['#E45C5C', '#DB8282', '#E4BABA', '#C2ECC2', '#86E590', '#37DC1C'];
        const colorIndex = value => {
          const index = Math.round((value + maxAbsValue) / (maxAbsValue * 2) * (colors.length - 1));
          return Math.min(Math.max(index, 0), colors.length - 1);
        };
        const chartData = data.map(item => {
          const color = colors[colorIndex(item.value)];
          return { name: item.name, y: item.value, color };
        });
  
      setChartOptions({
        chart: {
          type: 'bar',
          height: 700,
          width: 1000
        },
        title: {
          text: null,
        },
        xAxis: {
          categories: chartData.map(item => item.name),
        },
        yAxis: {
          title: {
            text: null,
          },
          labels: {
            formatter: function() {
              return this.value;
            },
          },
          min: -1,
          max: 1,
        },
        legend: {
          enabled: false,
        },
        plotOptions: {
            bar: {
                dataLabels: {
                    enabled: true,
                    formatter: function() {
                    return this.y.toFixed(3);
                    },
                },
                colorByPoint: false,
                colors: chartData.map(item => item.color),
                pointWidth: 25,
                events: {
                  click: handleBarClick,
                }, 
            },
        },
        series: [{
          name: 'Value',
          data: chartData,
        }],
        credits: {
            enabled: false,
        },
      });
    }, []);

    
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </div>
    )
}