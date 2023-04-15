import React from 'react';
import Highcharts from 'highcharts';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';

HighchartsMore(Highcharts);


export const CorrCoeffGaugeChart = ({corr_coeff}) => {
    const data = [corr_coeff]
    const chartRef = React.useRef();

    const options = {
        chart: {
          type: 'gauge',
          plotBackgroundColor: null,
          plotBackgroundImage: null,
          plotBorderWidth: 0,
          plotShadow: false,
          height: "100%"
        },
        title: {
          text: '',
        },
        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '80%'],
            size: '100%'
        },
        tooltip: {
            enabled: false,
        },
        yAxis: {
          min: -1,
          max: 1,
          tickPixelInterval: 72,
          tickWidth: 2,
          tickPosition: 'inside',
          tickLength: 20,
          minorTickInterval: null,
          labels: {
            step: 2,
            rotation: 'auto',
          },
          title: {
            text: '',
          },
          plotBands: [
            {
                from: -1,
                to: -0.6,
                color: '#D63D3D', // red
            },
            {
                from: -0.6,
                to: 0.6,
                color: '#55BF3B', // green
            },
            {
                from: 0.6,
                to: 1,
                color: '#6DD778', // yellow
            },
          ],
        },
        series: [{
            name: 'Correlation Coefficient',
            data: data,
            dataLabels: {
                format: '<strong>{y}</strong>',
                borderWidth: 0,
                color: null,
                style: {
                    fontSize: '16px'
                },
            },
            dial: {
                radius: '80%',
                backgroundColor: 'black',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'black',
                radius: 6
            }
    
        }], 
        credits: {
            enabled: false
        }
    };

    const colorBands = options.yAxis.plotBands;
    let color = null;
    for (let i = 0; i < colorBands.length; i++) {
    const band = colorBands[i];
    if (data >= band.from && data <= band.to) {
        color = band.color;
        break;
    }
    }

    // Set the color of the data label to match the color band
    options.series[0].dataLabels.color = color;

    return (
        <div>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartRef}
            />
        </div>
    )
}