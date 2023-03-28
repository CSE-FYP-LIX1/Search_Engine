import { useEffect, useState } from 'react'; 
import { Button } from "../common/Components/Button.tsx";
import { useSearchParams } from 'react-router-dom';
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import DisplayResults from "../common/Components/DisplayResults.tsx";
import { solrSearchUrl, ldaWeightageSearchUrl, corrCoeffSearchUrl } from "../constants"; 
import { LeftArrowSvg } from '../assets/svgs';
import { solrAxiosQuery } from '../axios';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query"));
    const searchQuery = searchParams.get("query");
    const [searchResults, setSearchResults] = useState([]); 
    const [relevantDates, setRelevantDates] = useState([]); 
    const [corrCoeff, setCorrCoeff] = useState(undefined); 

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

    /*eslint-disable */
    useEffect(() => {
        let queryString = "title: " + searchQuery; 
        solrAxiosQuery(solrSearchUrl, queryString, setSearchResults, 10);
    }, [searchQuery])

    useEffect(() => {
        let queryString = "Keywords: " + searchQuery; 
        solrAxiosQuery(ldaWeightageSearchUrl, queryString, setRelevantDates, 10);
    }, [searchQuery])
    
    useEffect(() => {
        let queryString = "Keyword: " + searchQuery; 
        solrAxiosQuery(corrCoeffSearchUrl, queryString, setCorrCoeff, 1); 
    }, [searchQuery])
    
    return (
        <>
            <div className="px-32 py-[52px] relative overflow-auto h-full bg-background-blue font-rubik">
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
                                        source={record.url}
                                        sourceName={record.sourceName}
                                        releaseDate={record.published_at}
                                        content={record.description}
                                    />
                                )   
                            })
                        }
                    </div>
                    <div className='flex flex-col w-2/12 px-3 gap-4'>
                        {
                            relevantDates.length > 0 ? 
                            <div className='text-xl font-semibold text-left'> 
                                Topic Most Relevant During These Times
                            </div> : 
                            <div className='text-base font-semibold text-left'>
                                Query does not match any topic in the database
                            </div>
                        }
                        {/* Using mock data right now */}
                        <div className='flex flex-col gap-4'>
                            {
                                relevantDates.sort((a, b) => {return b.Combined_weightage[0] - a.Combined_weightage[0]}).map((elem, idx) => {
                                    let tempDateObj = new Date(elem.Date); 
                                    var options = { year: 'numeric', month: 'long' };
                                    // let dateString = tempDateObj.getFullYear() + "-" + (tempDateObj.getMonth() + 1) + "-" + tempDateObj.getDate(); 
                                    let dateString = tempDateObj.toLocaleDateString("en-US", options)
                                    return (
                                        <div className="flex flex-col">
                                            <div className='font-bold text-left text-base flex flex-row'>
                                                <div>{idx + 1}.&nbsp;</div>
                                                {dateString}
                                            </div>
                                            <div className='flex flex-row'> 
                                                <div className='font-bold'> Weightage :&nbsp;</div>
                                                {elem.Combined_weightage}
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        {
                            corrCoeff && corrCoeff.length > 0 ? 
                            <div className="text-lg mt-5">
                                {corrCoeff[0]['corr_coeff'] > 0 ? <div className='text-[#6DD778] font-bold text-center'>{corrCoeff[0]['corr_coeff']}</div> 
                                                                            : <div className='text-[#D63D3D] font-bold text-center'>{corrCoeff[0]['corr_coeff']}</div>}
                                <div className='text-center'>
                                    correlation coefficient
                                </div>
                                <div className='text-center text-xs'>
                                    This indicates that whenever the topic of “{query}” is trending, the S&P 500 index {corrCoeff[0]['corr_coeff'] > 0 ? "increase" : "decreases"}.
                                </div>
                            </div> : 
                            <div></div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default SearchResults;