/*eslint-disable*/
import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HCMore from 'highcharts/highcharts-more';
import HCSolidGauge from 'highcharts/modules/solid-gauge';
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { solrAxiosQuery } from '../../axios';
import { solrSearchUrl } from '../../constants';
import DisplayResults from './DisplayResults.tsx';

HCMore(Highcharts);
HCSolidGauge(Highcharts);

export const CoefficientResultsBarGraph = ({top10Corr, bot10Corr, handleBarClick}) => {
    let data = [];
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTopic, setSelectedTopic] = useState(""); 
    const [searchResults, setSearchResults] = useState([]); 

    const getAssociatedLinks = (query) => {
      let queryString = "title: " + query; 
      solrAxiosQuery(solrSearchUrl, queryString, setSearchResults, 24);
    }


    top10Corr && top10Corr.forEach((elem) => {
        data.push({name: elem.Keyword[0], value: Number.parseFloat(elem.corr_coeff[0].toFixed(3))})
        
    }) 

    bot10Corr && bot10Corr.slice().reverse().forEach((elem) => {
        data.push({name: elem.Keyword[0], value: Number.parseFloat(elem.corr_coeff[0].toFixed(3))})
    })

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
                  click: (e) => {
                    handleOpen(); 
                    setSelectedTopic(e.point.options.name); 
                    getAssociatedLinks(e.point.options.name); 
                  },
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

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
      width: "80vw",
      overflow:'scroll',
      height: "80vh",
  }
    
    return (
        <div>
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" 
                        variant="h6" component="h2" className="text-center">
                          <div className='text-center text-4xl my-4'>
                            Articles that are associated with "{selectedTopic}"
                          </div>
                          <div className='flex flex-row flex-wrap'>
                            {
                              searchResults.map((record) => {
                                return (
                                    <DisplayResults 
                                        id={record.id}
                                        title={record.title}
                                        source={record.url}
                                        sourceName={record.sourceName}
                                        releaseDate={record.published_at}
                                        content={record.short_description}
                                        imageLink={record.header_image}
                                    />
                                  ) 
                                }
                              )
                            }
                          </div>
                    </Typography>
                </Box>
            </Modal>
        </div>
    )
}