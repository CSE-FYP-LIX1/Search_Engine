import React, {useEffect, useState} from "react";
import { MagGlassSvg, StockChartSvg } from "../assets/svgs";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";
import { CoefficientResults } from "../common/Components/CoefficientResults.tsx";
import axios from "axios"; 
import { corrCoeffSearchUrl } from "../constants";
import { CoefficientResultsBarGraph } from "../common/Components/CoefficientResultsBarGraph";

export const TrendiestTopics = () => {
    const [top10Corr, setTop10Corr] = useState([]);
    const [bot10Corr, setBot10Corr] = useState([]); 

    const ImageNavElements = [
        {link: "/search", svg: <MagGlassSvg width={"28px"} height={"28px"} />, hoverText: "Go to the search engine to search for specific topics", title: "Search Engine"},
        {link: "/stock-trends", svg: <StockChartSvg width={"28px"} height={"28px"} />, hoverText: "Go to the ranking of all the topics based on how much they effect the S&P500 index across the past 15 years", title: "Stock Trends"},
    ]

    useEffect(() => {
        //UNIQUE BEHAVIOR SO KEEP HERE INSTEAD OF USE solrAxiosQuery
        axios.get(corrCoeffSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": `*:*`,
                "indent": true,
                "q.op": "OR",
                "rows" : 10,
                "sort" : "corr_coeff desc"
            }
        }).then(res => {
            setTop10Corr(res.data.response.docs); 
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [])

    useEffect(() => {
        //UNIQUE BEHAVIOR SO KEEP HERE INSTEAD OF USE solrAxiosQuery
        axios.get(corrCoeffSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": `*:*`,
                "indent": true,
                "q.op": "OR",
                "rows" : 10,
                "sort" : "corr_coeff asc"
            }
        }).then(res => {
            setBot10Corr(res.data.response.docs); 
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [])

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-3xl py-[5vh] bg-background-blue">
                <div className="flex flex-row mx-auto">
                    Below is the ranking of all the&nbsp;
                    <div className="font-bold">most dominant topics</div>
                    &nbsp;based on
                </div>
                <div className="flex flex-row mx-auto">
                    their effect on the S&P500 trend
                </div>
                <div className="mx-auto mt-4">
                    <ImageNavBar 
                        ImageNavElements={ImageNavElements}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-10">
                {/* <CoefficientResults titleColor="#6DD778" title="Positive" data={top10Corr}/> 
                <CoefficientResults titleColor="#D63D3D" title="Negative" data={bot10Corr}/>  */}
                {
                   top10Corr.length > 0 && bot10Corr.length > 0 && <CoefficientResultsBarGraph top10Corr={top10Corr} bot10Corr={bot10Corr}/> 
                }
            </div>
        </div>
    )
}