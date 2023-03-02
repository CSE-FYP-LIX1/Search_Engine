import React, {useEffect, useState} from "react";
import { useSearchParams } from 'react-router-dom';
import { snpSearchUrl } from "../constants";
import axios from "axios";
import StockTrendsChart from "../common/Components/StockTrendChart";
import TopicBreakdownPieChart from "../common/Components/TopicBreakdownPieChart";

const StockTrendsResults = () => {
    const [searchParams] = useSearchParams(); 
    const startDate = new Date(searchParams.get("startDate")); 
    const endDate = new Date(searchParams.get("endDate"));

    const solrStartDate = startDate.getFullYear() + "-" + (startDate.getMonth() + 1) + "-" + startDate.getDate(); 
    const solrEndDate = endDate.getFullYear() + "-" + (endDate.getMonth() + 1) + "-" + endDate.getDate(); 

    const [snpData, setSnpData] = useState(); 

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
            setSnpData(res.data.response.docs); 
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

    return (
        <div className="flex flex-col gap-4 mt-2">
            <StockTrendsChart startDate={solrStartDate} endDate={solrEndDate} stockData={snpData}/>
            <div className="mx-auto text-2xl">
                <span className="text-rose-500 font-bold">-5.5%</span> decrease in index
            </div>
            <div className="flex flex-row justify-center gap-[30vw] font-rubik">
                <div className="flex flex-col text-2xl gap-4">
                    <div>
                        <span className="font-bold">Top 5</span> topics during this time
                    </div>
                    <div className="font-semibold">
                        {
                            mockTop5Data.map((elem) => {
                                return (
                                    <div className="text-center">
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
            </div>
        </div>
    )
}

export default StockTrendsResults; 