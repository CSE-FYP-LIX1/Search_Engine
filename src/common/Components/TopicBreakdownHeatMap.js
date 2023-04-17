import React from "react";
import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";

const TopicBreakdownHeatmap = ({top5Data, startDate, endDate}) => {
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
  let xAxis = dateRange(startDate, endDate); 
  let yAxis = [];
  HighchartsHeatmap(Highcharts);

  let reshapeData = {};

  if (top5Data !== undefined) {
    console.log(top5Data);
    for (let i = 0; i < top5Data.length; i++) {
      let keyWord = top5Data[i][0]['Keywords'][0]; 
      yAxis.push(keyWord); 
      reshapeData[keyWord] = {}; 
      for (let j = 0; j < xAxis.length; j++) {
        reshapeData[keyWord][xAxis[j]] = {"Combined_weightage" : 0}; 
      }
    }

    top5Data.forEach((elem) => {
      elem.forEach((elem2) => {
        let keyWord = elem2['Keywords'][0]; 
        let tempDate = new Date(elem2.Date[0]); 
        let convertDateFormat = tempDate.toISOString().split('T')[0]
        let combinedWeightageFormat = elem2.Combined_weightage[0] * 100; 
        reshapeData[keyWord][convertDateFormat] = {"Combined_weightage" : combinedWeightageFormat}; 
      })
    });
  }

  let temp = Object.values(reshapeData); 
  let finalizedData = []
  temp.forEach((elem) => {
    finalizedData.push(Object.values(elem))
  }); 
  
  const data2 = finalizedData.map((l, i) => l.map((c, j) => ([j, i, c.Combined_weightage]))).flat(); 

  const chartOptions = {
    chart: {
      type: "heatmap",
      marginTop: 40,
      marginBottom: 80,
      plotBorderWidth: 1,
    },
    title: {
      text: "Weightage of Topics Over Selected Time Period"
    },

    yAxis: {
      categories: yAxis,
      title: null,
      reversed: true
    },

    xAxis: {
      categories: xAxis,
    },

    tooltip: {
      formatter: function() {
        return (
          "On <b>" +
          this.series.xAxis.categories[this.point.x] +
          "</b> <br>The weightage for <b>" +
          this.series.yAxis.categories[this.point.y] + 
          "</b> was <b>" +
          this.point.value.toFixed(3) +
          "</b>%" 
        );
      }
    },

    colorAxis: {
      min: 0,
      minColor: "#FFFFFF",
      maxColor: Highcharts.getOptions().colors[0]
    },
    
    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280
    },

    series: [
      {
        turboThreshold: 0,
        borderWidth: 1,
        data: data2,
        dataLabels: {
          enabled: false,
          color: "#000000"
        }
      }
    ],

    credits: {
      enabled: false
    },
  };
    return (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    )
}

export default TopicBreakdownHeatmap; 