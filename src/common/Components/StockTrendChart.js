import React from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from './btcData.json'
import moment from 'moment'

const StockTrendsChart = ({startDate, endDate, stockData}) => {
  const options = {style: 'currency', currency: 'USD'};
  const numberFormat = new Intl.NumberFormat('en-US', options);

  const configPrice = {
    yAxis: [{
      offset: 20,

      labels: {
        formatter: function () {
          return numberFormat.format(this.value) 
        }
        ,
        x: -15,
        style: {
          "color": "#000", "position": "absolute"

        },
        align: 'left'
      },
    },
      
    ],
    tooltip: {
      shared: true,
      formatter: function () {
        return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM YYYY')
      }
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,

      }
    },
    rangeSelector: {
      selected: 1
    },
    title: {
      text: `S&P500 Stock Price (Monthly Increments)`
    },
    chart: {
      height: 600,
    },

    credits: {
      enabled: false
    },

    legend: {
      enabled: true
    },
    xAxis: {
      type: 'datetime',
    },
    rangeSelector: {
      buttons: [{
        type: 'year',
        count: 1,
        text: '1Y'
      }, {
        type: 'year',
        count: 3,
        text: '3Y'
      }, {
        type: 'year',
        count: 5,
        text: '5Y'
      },
        {
        type: 'all',
        text: 'All'
      }],
      selected: 4
    },
    series: [{
      name: 'Price',
      type: 'spline',

      data: stockData,
      tooltip: {
        valueDecimals: 2
      },

    }
    ]
  };

  return (
    <div>
      <ReactHighcharts config = {configPrice}></ReactHighcharts>
    </div>
  )
}

export default StockTrendsChart; 

