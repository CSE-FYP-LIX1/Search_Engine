import { useEffect, useState } from 'react'; 
import { useSearchParams } from 'react-router-dom';
import { InputField } from "../common/Components/InputField.tsx";
import { createSearchParams, useNavigate } from "react-router-dom";
import DisplayResults from "../common/Components/DisplayResults.tsx";
import axios from "axios";
import { solrSearchUrl } from "../constants"; 
// import Axios from '../axios';
// import UserInput from '../common/Components/userInput';

const SearchResults = () => {
    const [searchParams] = useSearchParams();
    const [query, setQuery] = useState(searchParams.get("query"));
    // const [searchQuery, setSearchQuery] = useState(searchParams.get("query"));
    // const [solrSearchUrl, setSolrSearchUrl] = useState("http://localhost:8983/solr/fyp_documents/select");
    const searchQuery = searchParams.get("query");
    // const solrSearchUrl = "http://localhost:8983/solr/fyp_documents/select";
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
    const mockRelevantTopicDateData = [
        {date : "28 August 2007"},
        {date : "14 June 2021"},
        {date : "2 Febuary 2001"},
        {date : "30 January 2013"}
    ]
    useEffect(() => {
        axios.get(solrSearchUrl, {
            params : {
                // "fl": props.fetchFields,
                "q": "content: " + query,
                "indent": true,
                "q.op": "OR",
                "rows": 5
            }
        }).then(res => {
            console.log(res.data.response.docs);
            setSearchResults(res.data.response.docs); 
        }).catch(err => {
            console.log(`The error is ${err}`)
        })

        // setSolrLdaUrl("http://localhost:8983/solr/lda_data/select")
        // axios.get("http://localhost:8983/solr/lda_data/select", {
        //     params: {
        //         "q": "*:*", //Test query: "id:Russia_25/12/2022_30/12/2022"
        //         "indent": true,
        //         "q.op": "OR"
        //         // "rows": 5
        //     }
        // })
        //     .then(res => {
        //         const ldaDataResults = res.data.response.docs;
        //         // setLdaData(ldaDataResults);
        //         console.log(ldaDataResults);
        //     })
    }, [searchQuery, searchParams, query])
    
    return (
        <>
            <div className="px-32 py-[52px] z-10 relative overflow-auto h-full font-source-sans-pro">
                <div className="flex flex-col gap-4 mb-4">
                    <div className="mx-auto">
                        <InputField customStyles={["py-4", "w-[600px]", "text-2xl"]} query={query} inputCallback={(query) => setQuery(query)} onKeyDownCallback={() => {
                            console.log("Enter is being clicked")
                            navigateWithQuery(query);
                        }} />
                    </div>
                </div>
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
        // <div className='text-center'>
        //     {/* <h3>What would you like to search?</h3> */}
        //     {/* <UserInput query={query} setQuery={setQuery} /> */}
        //     <Axios query={query} />
        // </div>
    )
}

export default SearchResults;