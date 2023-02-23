import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DisplayResults from "./common/Components/DisplayResults.tsx";

const Axios = (props) => {
    const [bigMan, setBigMan] = useState();
    const [solrSearchUrl, setSolrSearchUrl] = useState("");
    const [solrLdaUrl, setSolrLdaUrl] = useState("");
    const [ldaData, setLdaData] = useState();

    useEffect(() => {
        setSolrSearchUrl("http://localhost:8983/solr/fyp_documents/select")
        axios.get(solrSearchUrl, {
            params: {
                "fl": props.fetchFields,
                "q": props.query,
                "indent": true,
                "q.op": "OR",
                "rows": 5
            }
        })
            .then(res => {
                const bigManTing = res.data.response.docs;
                   setBigMan(bigManTing);
                //    console.log(bigManTing);
            })

        setSolrLdaUrl("http://localhost:8983/solr/lda_data/select")
        axios.get(solrLdaUrl, {
            params: {
                "q": "*:*", //Test query: "id:Russia_25/12/2022_30/12/2022"
                "indent": true,
                "q.op": "OR"
                // "rows": 5
            }
        })
            .then(res => {
                const ldaDataResults = res.data.response.docs;
                setLdaData(ldaDataResults);
                console.log(ldaDataResults);
            })
    }, [props.fetchFields, props.query, solrSearchUrl])

    return (
        <div>
            {bigMan !== undefined ?
                bigMan.map((obj, index) => {
                    return (
                    <div>
                        {index === 0 ? 
                        <> 
                            <h2>ID:</h2>
                            <DisplayResults id={obj.id} />
                            <br /> 
                        </> :
                        <>
                            <DisplayResults id={obj.id} />
                            <br /> 
                        </>
                        }
                    </div>
                    )
                })
                : "Piss off"}
        </div>
    )
}

export default Axios;