import { useEffect, useState } from 'react'; 
import { Button } from "../common/Components/Button.tsx";
import { useSearchParams } from 'react-router-dom';
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import DisplayResults from "../common/Components/DisplayResults.tsx";
import axios from "axios";
import { solrSearchUrl } from "../constants"; 
import { LeftArrowSvg } from '../assets/svgs';
import { axiosContentQuery } from '../axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query"));
    const searchQuery = searchParams.get("query");
    const [searchResults, setSearchResults] = useState([]); 

    const navigate = useNavigate();

    const navigateWithQuery = (query) => {
        navigate({
            pathname: "/search-results",
            search: createSearchParams({
                query: query
            }).toString()
        })
    }

    const navigateToSearchHome = () => navigate("/search");

    const mockRelevantTopicDateData = [
        {date : "28 August 2007"},
        {date : "14 June 2021"},
        {date : "2 Febuary 2001"},
        {date : "30 January 2013"}
    ]

    /*eslint-disable */
    useEffect(() => {
        axiosContentQuery(solrSearchUrl, searchQuery, setSearchResults);
    }, [])
    
    return (
        <>
            <div className="px-32 py-[52px] relative overflow-auto h-full bg-background-blue">
                <div className='rounded-full bg-white hover:bg-button-hover w-fit p-2 absolute top-1 left-1' onClick={()=>navigateToSearchHome()}>
                    <LeftArrowSvg width={"32px"} height={"32px"}/>
                </div>
                <div className="flex flex-col gap-4 mb-4">
                    <div className="text-2xl text-center">Financial News Search</div>
                    <div className="mx-auto">
                        <InputField customStyles={["py-4", "w-[600px]", "text-2xl", "bg-white"]} query={query} inputCallback={(query) => setQuery(query)} onKeyDownCallback={() => {
                            console.log("Enter is being clicked")
                            navigateWithQuery(query);
                        }} />
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
            </div>
            <div className='px-32 py-[52px] relative overflow-auto h-full'>
                <div className='flex flex-row'>
                    <div className="flex flex-col gap-8 w-10/12">
                        <div className='text-xl font-semibold text-left'>
                            Relevant News Articles
                        </div>
                        {
                            searchResults.length === 0 ? 
                            <>
                                <div>No results</div>
                            </> : 
                            searchResults.map((record) => {
                                return (
                                    <DisplayResults 
                                        id={record.id}
                                        title={record.title}
                                        source={record.source}
                                        sourceName={record.sourceName}
                                        releaseDate={record.releaseDate}
                                        content={record.content}
                                    />
                                )   
                            })
                        }
                    </div>
                    <div className='flex flex-col w-2/12 px-3 gap-4'>
                        <div className='text-xl font-semibold text-left'>
                            Topic Most Relevant During These Times
                        </div>
                        {/* Using mock data right now */}
                        <div className='flex flex-col gap-4'>
                            {
                                mockRelevantTopicDateData.map((elem, idx) => {
                                    return (
                                        <div className='text-left text-base flex flex-row'>
                                            <div className='font-bold'>{idx + 1}.&nbsp;</div>
                                            {elem.date}
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResults;