import axios from 'axios';

/**
 * 
* @param {*} url: solr search url  
 * @param {*} content: the string you want to query with, ex: Ukraine
 * @param {*} setData: function to set the data outside
 * @returns 
 */
export const axiosContentQuery = async (url, content, setData) => {
    let data = []; 
    axios.get(url, {
        params : {
            // "fl": props.fetchFields,
            "q": "content: " + content,
            "indent": true,
            "q.op": "OR",
            "rows": 5
        }
    }).then(res => {
        console.log(res.data.response.docs);
        setData(res.data.response.docs); 
    }).catch(err => {
        console.log(`The error is ${err}`)
    })
}

/**
 * 
 * @param {*} url: solr search url 
 * @param {*} solrStartDate: if a date query, this is the start date in the format of YYYY-MM-DD
 * @param {*} solrEndDate: if a date query, this is the end date in the format of YYYY-MM-DD
 * @param {*} setData: function to set the data outside
 */
export const axiosDateQuery = async (url, solrStartDate, solrEndDate, setData) => {
    let data = []; 
    
    axios.get(url, {
        params : {
            // "fl": props.fetchFields,
            "q": `Date:[${solrStartDate}T00\\:00\\:00Z TO ${solrEndDate}T00\\:00\\:00Z]`,
            "indent": true,
            "q.op": "OR",
            "rows": 5
        }
    }).then(res => {
        console.log(res.data.response.docs);
        setData(res.data.response.docs);
    }).catch(err => {
        console.log(`The error is ${err}`)
    })
}