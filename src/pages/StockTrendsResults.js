import React, {useEffect, useState} from "react";
import { useSearchParams, useNavigate } from 'react-router-dom';
import { snpSearchUrl } from "../constants";
import axios from "axios";
import StockTrendsChart from "../common/Components/StockTrendChart";
import TopicBreakdownPieChart from "../common/Components/TopicBreakdownPieChart";
import { LeftArrowSvg } from "../assets/svgs";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";


const StockTrendsResults = () => {
    const navigate = useNavigate(); 
    const [searchParams] = useSearchParams(); 
    const startDate = new Date(searchParams.get("startDate")); 
    const endDate = new Date(searchParams.get("endDate"));
    const solrStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); 
    const solrEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); 
    const [snpData, setSnpData] = useState(); 
    
    
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

    function getPercentageIncrease(numA, numB) {
        return ((numA - numB) / numB) * 100;
    }
    
    useEffect(() => {
        axios.get(snpSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": `Date:[${solrStartDate}T00\\:00\\:00Z TO ${solrEndDate}T00\\:00\\:00Z]`,
                "indent": true,
                "q.op": "OR",
                "rows" : 200
            }
        }).then(res => {
            console.log(res.data.response.docs);
            //Reshape StockData
            const data = []; 
            res.data.response.docs.map((elem) => {
                let date = new Date(elem.Date[0]).getTime()
                data.push([date, elem.Consumer_Price_Index[0]])
            }); 
            let chartData = data.sort((a, b) => a[0] - b[0]);  // <-- sort x-axis here
            setSnpData(chartData); 
            setPercentageDiff(getPercentageIncrease(chartData[chartData.length - 1][1], chartData[0][1]).toFixed(3));
            console.log(percentageDiff);
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [solrStartDate, solrEndDate])

    const mockTop5Data = [
        {topic: "Russia", weight: "30"},
        {topic: "COVID-19", weight: "20"},
        {topic: "Ukraine", weight:"20"},
        {topic: "War", weight:"15"},
        {topic: "World Cup", weight:"15"}   
    ]

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
                    <span className="text-[#6DD778] font-bold">{percentageDiff}</span> increase in index
                </div> :
                <div className="mx-auto text-2xl">
                    <span className="text-[#D63D3D] font-bold">{percentageDiff}</span> decrease in index
                </div>
                
            }
            <div className="flex flex-row justify-center gap-[30vw] font-rubik">
                <div className="flex flex-col text-2xl gap-4">
                    <div className="text-center">
                        <span className="font-bold">Top 5</span> topics during this time
                        <div className="text-base text-center">
                            Click on the topics for more details
                        </div>
                    </div>
                    <div className="font-semibold">
                        {
                            mockTop5Data.map((elem) => {
                                return (
                                    <div className="text-center hover:text-[#474747]" onClick={() => {
                                        handleOpen();
                                        getSelectedTopicInfo(elem.topic); 
                                    }}>
                                        {elem.topic} &#40;{elem.weight}%&#41;	
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div>
                    <TopicBreakdownPieChart />
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
                        <StockTrendsChart startDate={solrStartDate} endDate={solrEndDate} stockData={snpData}/>
                        <Typography id="modal-modal-description"
                            sx={{ mt: 2 }}>
                            <div className="text-center">
                                {/* Link up to api */}
                                <span className="text-[#44AD3A]">0.44</span> correlation
                            </div>
                        </Typography>
                    </Box>
                </Modal>
                
            </div>
        </div>
    )
}

export default StockTrendsResults; 