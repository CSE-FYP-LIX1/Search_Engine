/*eslint-disable*/
import { useEffect, useState } from "react";
import { Button } from "../common/Components/Button.tsx";
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ImageCarousel } from "../common/Components/ImageCarousel.tsx";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";
import { PlusMinusSvg, StockChartSvg } from "../assets/svgs";
import { carouselSearchUrl } from "../constants"; 
import { solrAxiosQuery } from '../axios';
import * as te from 'tw-elements';
import axios from 'axios';


const SearchHome = () => {
    const [query, setQuery] = useState("")
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    })
    
    function getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }

    const [carouselData, setCarouselData] = useState(
        [
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", topic: "temp1", topic_summary: "temp1"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", topic: "temp2", topic_summary: "temp2"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", topic: "temp3", topic_summary: "temp3"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", topic: "temp1", topic_summary: "temp1"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", topic: "temp2", topic_summary: "temp2"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", topic: "temp3", topic_summary: "temp3"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", topic: "temp1", topic_summary: "temp1"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", topic: "temp2", topic_summary: "temp2"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", topic: "temp3", topic_summary: "temp3"},
        ],
    ); 

    const navigate = useNavigate();

    const navigateWithQuery = (query) => {
        if (dateRange.startDate === "") {
            navigate({
                pathname: "/search-results",
                search: createSearchParams({
                    query: query
                }).toString()
            })
        } else {
            navigate({
                pathname: "/search-results", 
                search: createSearchParams({
                    query: query,
                    startDate: dateRange.startDate, 
                    endDate: dateRange.endDate
                }).toString()
            })
        }
    }

    const ImageNavElements = [
        {link : "/stock-trends", svg: <StockChartSvg width={"32px"} height={"32px"}/>, hoverText: "Go to the stock trend page to view the top topics across of time", title: "Stock Market Trends"},
        {link: "/trendiest-topics", svg: <PlusMinusSvg width={"28px"} height={"28px"} />, hoverText: "Go to the ranking of all topics overtime", title: "Trendiest Topics"},
    ]

    useEffect(() => {
        let randomSeed = getRandomNumber(0, 100);
        let queryString = "*:*"; 
        axios.get(carouselSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": queryString,
                "indent": true,
                "q.op": "OR",
                "rows" : 9,
                "sort" : `random_${randomSeed} DESC`

            }
        }).then(res => {
            setCarouselData(res.data.response.docs)
        }).catch(err => {
            console.log(`The error is ${err}`)
        })
    }, [])

    return (
        <div className="relative">
            <div className="relative z-20 overflow-hidden h-full font-source-sans-pro flex flex-col gap-4">
                <div className="bg-[#283454] py-10 px-10">
                    <div className="flex flex-col gap-3 align-middle relative">
                        <div className="text-2xl text-center text-white">Financial News Search</div>
                        <div className="mx-auto">
                            <InputField customStyles={["py-2", "w-[800px]", "text-xl", "bg-white", "relative"]} startDate={dateRange.startDate} endDate={dateRange.endDate} updateDateRange={setDateRange} inputCallback={(query) => setQuery(query)} onKeyDownCallback={() => {
                                navigateWithQuery(query);
                            }}/>
                        </div>
                        <div className="mx-auto">
                            <Button 
                                buttonCallback={()=>navigateWithQuery(query)}
                                customStyles={["w-[200px]", "text-white"]}
                            >
                                Search
                            </Button>
                        </div>
                        <div className="mx-auto">
                            <ImageNavBar 
                                ImageNavElements={ImageNavElements}
                            />
                        </div>
                    </div>
                </div>
                <div className="my-4 text-center text-xl font-bold">
                    Suggested Topics
                </div>
                <div>
                    <ImageCarousel suggestedTopics={
                        carouselData
                    }/>

                </div>
            </div>
        </div>
    )
}

export default SearchHome; 