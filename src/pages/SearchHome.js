/*eslint-disable*/
import { useState } from "react";
import { Button } from "../common/Components/Button.tsx";
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import { ImageCarousel } from "../common/Components/ImageCarousel.tsx";
import * as te from 'tw-elements';

const SearchHome = () => {
    const [query, setQuery] = useState("")
    const navigate = useNavigate();

    const navigateWithQuery = (query) => {
        navigate({
            pathname: "/search-results",
            search: createSearchParams({
                query: query
            }).toString()
        })
    }
    return (
        <>
            <div className="px-32 py-[52px] z-10 relative overflow-auto h-full font-source-sans-pro flex flex-col gap-[10vh]">
                <div className="flex flex-col gap-3 align-middle">
                    <div className="text-2xl text-center">Financial News Search</div>
                    <div className="mx-auto">
                        <InputField customStyles={["py-2", "w-[800px]", "text-xl"]} inputCallback={(query) => setQuery(query)} onKeyDownCallback={() => {
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
                </div>
                <div className="text-center text-xl font-bold">
                    Suggested Topics
                </div>
                <div>
                    <ImageCarousel suggestedTopics={
                        [
                            {image: "https://mdbcdn.b-cdn.net/img/new/slides/041.webp", topicTitle: "temp1", topicSummary: "temp1"},
                            {image: "https://mdbcdn.b-cdn.net/img/new/slides/042.webp", topicTitle: "temp2", topicSummary: "temp2"},
                            {image: "https://mdbcdn.b-cdn.net/img/new/slides/043.webp", topicTitle: "temp3", topicSummary: "temp3"},
                        ]
                    }/>
                </div>
            </div>
        </>
    )
}

export default SearchHome; 