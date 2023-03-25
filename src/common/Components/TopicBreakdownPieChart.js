import _ from "lodash";
import React from "react";
import Highcharts from "highcharts";
import HighchartsHeatmap from "highcharts/modules/heatmap";
import HighchartsReact from "highcharts-react-official";
import rawData, { processedData } from "./data";
import { severityHexColors, getColor, rgbObjectToHex } from "../../heatmapUtils";

const TopicBreakdownPieChart = (top5Data) => {
  console.log(top5Data);
  HighchartsHeatmap(Highcharts);
  const x = [
    rawData.action,
    rawData.cnc,
    rawData.installation,
    rawData.delivery,
    rawData.none
  ].reverse();

  let reshapeData = [];

  // top5Data.forEach((elem) => {
  //   reshapeData.push([{weightage: elem.weightage}])
  // })

  const data = x
    .map((l, i) =>
      l.map((c, j) => ({
        x: j,
        y: i,
        value: c.count,
        name: c.count.toLocaleString(),
        color:
          c.count === 0
            ? "transparent"
            : rgbObjectToHex(getColor(j + 1, i, 10, 5))
      }))
    )
    .flat();

  // console.log(JSON.stringify(data));

  const chartOptions = {
    chart: {
      type: "heatmap",
      marginTop: 20,
      marginBottom: 80,
      plotBorderWidth: 0,
      borderWidth: 0
    },
    credits: {
      enabled: false
    },
    title: {
      text: undefined
    },

    xAxis: {
      categories: _.fill(Array(10), 1).map((e, i) => (i + 1) * 10)
    },

    yAxis: {
      categories: ["None", "Delivery", "Installation", "C&C", "Action"],
      title: null
    },

    colorAxis: {
      min: 0,
      max: 1,
      stops: severityHexColors.map((hex, i, arr) => [i / arr.length, hex]),
      reversed: false
    },

    legend: {
      align: "right",
      layout: "vertical",
      margin: 0,
      verticalAlign: "top",
      y: 25,
      symbolHeight: 280
    },

    plotOptions: {
      series: {
        dataLabels: {
          formatter: function() {
            if (this.point.value > 0) {
              return this.point.value;
            }
          }
        }
      }
    },

    tooltip: {
      formatter: function() {
        return (
          "<b>" +
          this.series.xAxis.categories[this.point.x] +
          "</b> sold <br><b>" +
          this.point.value +
          "</b> items on <br><b>" +
          this.series.yAxis.categories[this.point.y] +
          "</b>"
        );
      }
    },

    series: [
      {
        name: "Sales per employee",
        borderWidth: 1,
        data,
        dataLabels: {
          enabled: true,
          color: "#000000"
        }
      }
    ]
  };
    return (
      <div className="App">
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      </div>
    )
}

export default TopicBreakdownPieChart; 