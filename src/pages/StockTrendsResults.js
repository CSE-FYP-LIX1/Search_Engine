/*eslint-disable*/
import React, {useEffect, useState} from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { snpSearchUrl, ldaWeightageSearchUrl } from "../constants";
import axios from "axios";
import StockTrendsChart from "../common/Components/StockTrendChart";
import TopicBreakdownHeatmap from "../common/Components/TopicBreakdownPieChart";
import { LeftArrowSvg } from "../assets/svgs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { WeightageTrendChart } from "../common/Components/WeightageTrendChart";

const StockTrendsResults = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams(); 
    const startDate = new Date(searchParams.get("startDate")); 
    const endDate = new Date(searchParams.get("endDate"));
    const solrStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); 
    const solrEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); 
    const [snpData, setSnpData] = useState(); 
    const [top5Data, setTop5Data] = useState([]); 
    const [top5DataSeries, setTop5DataSeries] = useState([]); 
    
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [selectedTopic, setSelectedTopic] = useState(); 
    
    const getSelectedTopicInfo = (selectedTopic) => {
        //Call selected topic api w/ date and selectedTopic
        setSelectedTopic(selectedTopic); 
    }
    const navigateToStockTrendsHome = () => navigate("/stock-trends");

    const [percentageDiff, setPercentageDiff] = useState(0); 

    /**
     * Funciton to get the percentage increase (positive and negative) 
     * @param {*} numA 
     * @param {*} numB 
     * @returns Percentage increase/decrease
     */
    function getPercentageIncrease(numA, numB) {
        return ((numA - numB) / numB) * 100;
    }
    
    /**
     * Specialized function to get the top 5 unique keyword objects. 
     * @param {*} arr The respponse from querying the lda weightage file 
     * @returns The top 5 objects with unique keywords
     */
    function findTop5Objects(arr) {
        let objCount = {};

        for (let i = 0; i < arr.length; i++) {
            let keyword = arr[i].Keywords; 

            //Write once unreadable code lmao
            objCount[keyword] = objCount[keyword] ? (objCount[keyword] < arr[i].Combined_weightage ? arr[i] : objCount[keyword]) : arr[i]; 
        }

        let sortedIds = Object.keys(objCount).sort(function(a,b) {
            return objCount[b] - objCount[a];
        });

        let top5Objects = [];

        sortedIds.slice(0,5).forEach((elem) => top5Objects.push(objCount[elem])); 

        return top5Objects; 
    }

    useEffect(() => {
        //UNIQUE BEHAVIOR SO KEEP HERE INSTEAD OF USE solrAxiosQuery
        axios.get(snpSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": `Date:[${solrStartDate}T00\\:00\\:00Z TO ${solrEndDate}T00\\:00\\:00Z]`,
                "indent": true,
                "q.op": "OR",
                "rows" : 200
            }
        }).then(res => {
            //Reshape StockData
            const data = []; 
            res.data.response.docs.forEach((elem) => {
                let date = new Date(elem.Date[0]).getTime()
                data.push([date, elem.Consumer_Price_Index[0]])
            }); 
            let chartData = data.sort((a, b) => a[0] - b[0]);  // <-- sort x-axis here
            setSnpData(chartData); 
            setPercentageDiff(getPercentageIncrease(chartData[chartData.length - 1][1], chartData[0][1]).toFixed(3));
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [solrStartDate, solrEndDate, percentageDiff])

    useEffect(() => {
        //UNIQUE BEHAVIOR SO KEEP HERE INSTEAD OF USE solrAxiosQuery
        axios.get(ldaWeightageSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": `Date:[${solrStartDate}T00\\:00\\:00Z TO ${solrEndDate}T00\\:00\\:00Z]`,
                "indent": true,
                "q.op": "OR",
                "rows" : 20,
                "sort" : "Combined_weightage desc"
            }
        }).then(res => {
            console.log(res.data.response.docs);
            let top5UniqueObj = findTop5Objects(res.data.response.docs);

            setTop5Data(top5UniqueObj); 
            top5UniqueObj.forEach((elem) => {
                axios.get(ldaWeightageSearchUrl, {
                    params: {
                        "q": `Date:[${solrStartDate}T00\\:00\\:00Z TO ${solrEndDate}T00\\:00\\:00Z] AND Keywords: ${elem.Keywords}`,
                        "indent": true,
                        "q.op": "OR",
                        "rows" : 1000,
                    }
                }).then(res => {
                    setTop5DataSeries(top5DataSeries => [...top5DataSeries, res.data.response.docs]); 
                }).catch(err => {
                    console.log(`The error is ${err}`); 
                })
            })
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [])

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
    }
    return (
        <div className="flex flex-col gap-4">
            <div className='rounded-full bg-white hover:bg-button-hover w-fit p-2 absolute top-1 left-1' onClick={()=>navigateToStockTrendsHome()}>
                <LeftArrowSvg width={"32px"} height={"32px"}/>
            </div>
            <div className="text-2xl font-bold text-center py-3 bg-background-blue">
                {`S&P 500 index from ${solrStartDate} to ${solrEndDate}`}
            </div>
            <StockTrendsChart startDate={solrStartDate} endDate={solrEndDate} stockData={snpData}/>
            {
                percentageDiff > 0 ?
                <div className="mx-auto text-2xl">
                    <span className="text-[#6DD778] font-bold">{percentageDiff}%</span> increase in index
                </div> :
                <div className="mx-auto text-2xl">
                    <span className="text-[#D63D3D] font-bold">{percentageDiff}%</span> decrease in index
                </div>
                
            }
            <div className="flex flex-row justify-center font-rubik mt-6">
                <div className="flex flex-col text-2xl gap-4">
                    <div className="text-center">
                        <span className="font-bold">Top 5</span> topics during this time
                        <div className="text-base text-center">
                            Click on the topics for more details
                        </div>
                    </div>
                    <div className="font-semibold">
                        {
                            top5Data.map((elem) => {
                                return (
                                    <div className="text-center hover:text-[#474747]" onClick={() => {
                                        handleOpen();
                                        getSelectedTopicInfo(elem.Keywords[0]); 
                                    }}>
                                        {elem.Keywords} &#40;{(elem.Combined_weightage * 100).toFixed(3)}%&#41;	
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="w-full mt-6">
                <TopicBreakdownHeatmap top5Data={top5DataSeries} startDate={solrStartDate} endDate={solrEndDate}/>
            </div>
            <Modal
                open={open}
                onClose={handleClose}
                closeAfterTransition
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" 
                        variant="h6" component="h2" className="text-center">
                        This is the selected topic: {selectedTopic}. <br /> {solrStartDate} to {solrEndDate}
                    </Typography>
                    {/* <StockTrendsChart startDate={solrStartDate} endDate={solrEndDate} stockData={snpData}/> */}
                    <WeightageTrendChart data={top5DataSeries} selectedTopic={selectedTopic} startDate={startDate} endDate={endDate}/>
                    {/* <Typography id="modal-modal-description"
                        sx={{ mt: 2 }}>
                        <div className="text-center">
                            <span className="text-[#44AD3A]">0.44</span> correlation
                        </div>
                    </Typography> */}
                </Box>
            </Modal>
        </div>
    )
}

export default StockTrendsResults; 