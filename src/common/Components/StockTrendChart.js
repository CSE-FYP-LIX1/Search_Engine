import React, { useState, useEffect } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'

const StockTrendsChart = ({startDate, endDate, stockData, top5DataSeries, top5Topics}) => {
  let chartOptions = {}; 

  const options = {style: 'currency', currency: 'USD'};
  const numberFormat = new Intl.NumberFormat('en-US', options);

  function dateRange(startDate, endDate) {
    var start      = startDate.split('-');
    var end        = endDate.split('-');
    var startYear  = parseInt(start[0]);
    var endYear    = parseInt(end[0]);
    var dates      = [];
  
    for(var i = startYear; i <= endYear; i++) {
      var endMonth = i !== endYear ? 11 : parseInt(end[1]) - 1;
      var startMon = i === startYear ? parseInt(start[1])-1 : 0;
      for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
        var month = j+1;
        var displayMonth = month < 10 ? '0'+month : month;
        dates.push([i, displayMonth, '01'].join('-'));
      }
    }
    return dates;
  }

  chartOptions = {
    yAxis: [{
      offset: 50,
      
      labels: {
        formatter: function () {
          return numberFormat.format(this.value) 
        }
        ,
        x: -15,
        style: {
          "color": "#000", "position": "absolute"

        },
        title: "Stock Price Per Share (USD)"
      },
    }, {
      opposite: false,
    }],
    tooltip: {
      shared: false,
    },
    plotOptions: {
      series: {
        showInNavigator: true,
        gapSize: 6,
        lineWidth: 2,

      },
      
    },
    title: {
      text: `S&P500 Stock Price (Monthly Increments) and Correlation of Topic Over Time`
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
      type: 'spline',
      name: "S&P500",
      data: stockData,
      tooltip: {
        valueDecimals: 2
      },
      yAxis: 0,
      lineWidth: 4
    }]
  }; 

  let reshapedSeries = []
  if (top5DataSeries.length > 4) {
    top5DataSeries.forEach((arr) => {
      let reshapedArr = []
      arr.forEach((record) => {
        let entry = [new Date(record['Date']).getTime(), record['Combined_weightage'][0]]
        reshapedArr.push(entry); 
      })
      reshapedSeries.push(reshapedArr); 
    })
    reshapedSeries.forEach((data, idx) => {
      let filledOutData = {}
      stockData.forEach(record => {
        filledOutData[record[0]] = 0;
      })
      data.forEach(record => {
        if (record[0] in filledOutData) {
          filledOutData[record[0]] = record[1];
        }
      })
      let finalData = Object.entries(filledOutData).map(([key, value]) => [parseInt(key), value]);
      
      const updatedChartOptions = { ...chartOptions };
      let series = {
        name: top5Topics[idx]['Keywords'],
        type: 'line', 
        data: finalData,
        yAxis: 1,
      }
      updatedChartOptions.series.push(series);
      chartOptions = updatedChartOptions; 
    })
  }

  return (
    <div>
      <ReactHighcharts config = {chartOptions}></ReactHighcharts>
    </div>
  )
}

export default StockTrendsChart; 

