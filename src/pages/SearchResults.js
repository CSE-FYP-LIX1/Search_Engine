/*eslint-disable */

import { useEffect, useState } from 'react'; 
import { Button } from "../common/Components/Button.tsx";
import { useSearchParams } from 'react-router-dom';
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate, useParams, useLocation } from "react-router-dom";
import DisplayResults from "../common/Components/DisplayResults.tsx";
import { solrSearchUrl, ldaWeightageSearchUrl, corrCoeffSearchUrl } from "../constants"; 
import { LeftArrowSvg } from '../assets/svgs';
import { solrAxiosQuery } from '../axios';
import axios from 'axios';
import { CorrCoeffGaugeChart } from '../common/Components/CorrCoeffGaugeChart.jsx';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query"));
    const searchQuery = searchParams.get("query");
    const [searchResults, setSearchResults] = useState([]); 
    const [relevantDates, setRelevantDates] = useState([]); 
    const [corrCoeff, setCorrCoeff] = useState(); 
    const [dateRange, setDateRange] = useState({
        startDate: searchParams.get("startDate"),
        endDate: searchParams.get("endDate"),
    });
    const navigate = useNavigate();

    const location = useLocation();
    const [renderValue, setRenderCount] = useState(0);
    const id  = useParams();

    useEffect(() => {
        setRenderCount(renderValue + 1);
    }, [location.pathname, id]);
  
    const navigateWithQuery = (query) => {
        if (dateRange.startDate === null) {
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

    const navigateToSearchHome = () => navigate("/search");

    useEffect(() => {
        let queryString = "short_description: " + searchQuery; 
        if (dateRange.startDate === null) {
            solrAxiosQuery(solrSearchUrl, queryString, setSearchResults, 24);
        } else {
            axios.get(solrSearchUrl, {
                params : {
                    // "fl": props.fetchFields,
                    "q": `published_at:[${dateRange.startDate}T00\\:00\\:00Z TO ${dateRange.endDate}T00\\:00\\:00Z] AND ` + queryString,
                    "indent": true,
                    "q.op": "OR",
                    "rows" : 20,
                }
            }).then(res => {
                setSearchResults(res.data.response.docs)
            }).catch(err => {
                console.log(`The error is ${err}`)
            })
        }
    }, [searchQuery, id, location.pathname])

    useEffect(() => {
        let queryString = "Keywords: " + searchQuery; 
        axios.get(ldaWeightageSearchUrl, {
            params : {
                "q": queryString,
                "indent": true,
                "q.op": "OR",
                "rows" : 10,
                "sort" : "Combined_weightage desc"
            }
        }).then(res => {
            setRelevantDates(res.data.response.docs)
        }).catch(err => {
            console.log(`The error is ${err}`)
        })

    }, [searchQuery])
    
    useEffect(() => {
        let queryString = "Keyword: " + searchQuery; 
        solrAxiosQuery(corrCoeffSearchUrl, queryString, setCorrCoeff, 1); 
    }, [searchQuery])

    return (
        <div className='h-full'>
            <div className="relative overflow-auto h-full font-rubik">
                <div className='bg-[#283454] px-32 py-[52px]'>
                    <div className='rounded-full bg-white hover:bg-button-hover w-fit p-2 absolute top-1 left-1' onClick={()=>navigateToSearchHome()}>
                        <LeftArrowSvg width={"32px"} height={"32px"}/>
                    </div>
                    <div className="flex flex-col gap-4 mb-4">
                        <div className="text-2xl text-center text-white">Financial News Search</div>
                        <div className="mx-auto w-2/3">
                            <InputField customStyles={["py-4", "w-full", "text-2xl", "bg-white"]} query={query} startDate={dateRange.startDate} endDate={dateRange.endDate} inputCallback={(query) => setQuery(query)} updateDateRange={setDateRange} onKeyDownCallback={() => {
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
                        <div className="flex flex-col gap-8 w-10/12 float-left">
                            <div className='text-xl font-semibold text-left'>
                                Relevant News Articles
                            </div>
                            <div className='flex flex-row flex-wrap'>
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
                                                content={record.short_description}
                                                imageLink={record.header_image}
                                            />
                                        )   
                                    })
                                }
                            </div>
                        </div>
                        <div className='flex flex-col w-1/6 px-3 gap-4 ml-1'>
                            {
                                corrCoeff && corrCoeff.length > 0 ? 
                                <div className="text-lg mt-5 rounded-lg bg-white shadow-lg py-4 px-1 ">
                                    <div className='text-center text-base'>
                                        A matching query was found in the database. Below is {searchQuery}'s correlation coefficient with the S&P500 Index.    
                                    </div>
                                    <CorrCoeffGaugeChart corr_coeff={corrCoeff[0]['corr_coeff']}/>
                                    {/* {corrCoeff[0]['corr_coeff'] > 0 ? <div className='text-[#6DD778] font-bold text-center'>{corrCoeff[0]['corr_coeff']}</div> 
                                                                                : <div className='text-[#D63D3D] font-bold text-center'>{corrCoeff[0]['corr_coeff']}</div>}
                                    <div className='text-center text-xs'>
                                        This indicates that whenever the topic of “{searchQuery}” is trending, the S&P 500 index {corrCoeff[0]['corr_coeff'] > 0 ? "increase" : "decreases"}.
                                    </div> */}
                                    <div className='text-center text-lg font-bold'>
                                        Correlation Coefficient
                                    </div>
                                    <div className='text-center text-xs'>
                                    The correlation indicates the effect this topic has on the stock market. A negative value means the stock goes down, and a positive value means it tends to move upwards when this topic is trending.                                    </div>
                                </div> : 
                                <div></div>
                            }
                            <div className='flex flex-col gap-4 rounded-lg bg-white shadow-md pb-5 px-2'>
                                {
                                    relevantDates.length > 0 ? 
                                    <div className='text-left mt-5'> 
                                        <div className='text-lg font-semibold'>
                                            This Topic Had The Highest Weightages* During These Months
                                        </div>
                                        <div className='text-sm mt-3'>
                                            *Weightage = articles about this topic / total articles
                                        </div>
                                    </div> : 
                                    <div className='text-base font-semibold text-left mt-5'>
                                        Query does not match any topic in the database
                                    </div>
                                }
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
                                                    <div className='font-bold'> Weightage:&nbsp;</div>
                                                    {parseFloat(elem.Combined_weightage * 100).toFixed(3)}%
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SearchResults;