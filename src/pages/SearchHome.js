/*eslint-disable*/
import { useEffect, useState } from "react";
import { Button } from "../common/Components/Button.tsx";
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ImageCarousel } from "../common/Components/ImageCarousel.tsx";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";
import { StockChartSvg } from "../assets/svgs";
import { carouselSearchUrl } from "../constants"; 
import { solrAxiosQuery } from '../axios';
import * as te from 'tw-elements';

const SearchHome = () => {
    const [query, setQuery] = useState("")
    const [carouselData, setCarouselData] = useState(
        [
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", topicTitle: "temp1", topicSummary: "temp1"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", topicTitle: "temp2", topicSummary: "temp2"},
            {image: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", topicTitle: "temp3", topicSummary: "temp3"},
        ]
    ); 
    const navigate = useNavigate();

    const navigateWithQuery = (query) => {
        navigate({
            pathname: "/search-results",
            search: createSearchParams({
                query: query
            }).toString()
        })
    }

    const ImageNavElements = [
        {link : "/stock-trends", svg: <StockChartSvg width={"32px"} height={"32px"}/>, hoverText: "Go to the stock trend page to view the top topics across of time"},
    ]

    useEffect(() => {
        let queryString = "*:*"; 
        solrAxiosQuery(carouselSearchUrl, queryString, setCarouselData, 4);
    }, [])



    return (
        <>
            <div className="px-32 py-8 z-10 relative overflow-auto h-full font-source-sans-pro flex flex-col gap-4 bg-background-blue">
                <div className="flex flex-col gap-3 align-middle">
                    <div className="text-2xl text-center">Financial News Search</div>
                    <div className="mx-auto">
                        <InputField customStyles={["py-2", "w-[800px]", "text-xl", "bg-white"]} inputCallback={(query) => setQuery(query)} onKeyDownCallback={() => {
                            navigateWithQuery(query);
                        }}/>
                    </div>
                    <div className="mx-auto">
                        <Button 
                            buttonCallback={()=>navigateWithQuery(query)}
                            customStyles={["w-[200px]"]}
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
            <div>
                <div className="my-4 text-center text-xl font-bold">
                    Suggested Topics
                </div>
                <div>
                    <ImageCarousel suggestedTopics={
                        carouselData
                    }/>

                </div>
            </div>
        </>
    )
}

export default SearchHome; 