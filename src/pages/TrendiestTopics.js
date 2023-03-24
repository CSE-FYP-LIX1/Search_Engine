import React from "react";
import { MagGlassSvg, StockChartSvg } from "../assets/svgs";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";
import { CoefficientResults } from "../common/Components/CoefficientResults.tsx";

export const TrendiestTopics = () => {
    const ImageNavElements = [
        {link: "/search", svg: <MagGlassSvg width={"28px"} height={"28px"} />, hoverText: "Go to the search engine to search for specific topics", title: "Search Engine"},
        {link: "/stock-trends", svg: <StockChartSvg width={"28px"} height={"28px"} />, hoverText: "Go to the ranking of all the topics based on how much they effect the S&P500 index across the past 15 years", title: "Stock Trends"},
    ]

    const mockData = [
        {topic: "Russia", coefficient: 0.86},
        {topic: "Russia", coefficient: 0.86},
        {topic: "Russia", coefficient: 0.86},
        {topic: "Russia", coefficient: 0.86},
        {topic: "Russia", coefficient: 0.86},
        {topic: "Russia", coefficient: 0.86},
    ]
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-3xl py-[5vh] bg-background-blue">
                <div className="flex flex-row mx-auto">
                    Below is the ranking of all the&nbsp;
                    <div className="font-bold">most dominant topics</div>
                    &nbsp;based on
                </div>
                <div className="flex flex-row mx-auto">
                    their affect on the S&P500 trend
                </div>
                <div className="mx-auto mt-4">
                    <ImageNavBar 
                        ImageNavElements={ImageNavElements}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-10">
                <CoefficientResults titleColor="#6DD778" title="Positive" data={mockData}/> 
                <CoefficientResults titleColor="#D63D3D" title="Negative" data={mockData}/> 
            </div>
        </div>
    )
}