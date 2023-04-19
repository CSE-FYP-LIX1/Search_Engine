import React from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'

const StockTrendsChart = ({startDate, endDate, stockData, top5DataSeries, top5Topics}) => {
  const topicArr = typeof(top5Topics[0]) === "object" ? top5Topics.map((elem) => {return elem['Keywords']}) : top5Topics;
  let chartOptions = {}; 

  const options = {style: 'currency', currency: 'USD'};
  const numberFormat = new Intl.NumberFormat('en-US', options);

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
      },
      title: {
        text: "Stock Price Per Share (USD)"
      },
    }, {
      opposite: false,
      title: {
        text: "Weightage of topic (Out of 1)"
      }
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
      text: `S&P500 Stock Price (Monthly Increments) and Weightages of Topics Over Time`
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
        type: 'month',
        count: 6,
        text: '6M'
      }, {
        type: 'month',
        count: 9,
        text: '9M'
      }, {
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
      selected: 6
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
  if (top5DataSeries.length > 0 && stockData !== undefined) {
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
        name: topicArr[idx],
        type: 'spline', 
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

