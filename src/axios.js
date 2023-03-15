import axios from 'axios';

export const solrAxiosQuery = async (url, query, setData, rows) => {
    axios.get(url, {
        params : {
            // "fl": props.fetchFields,
            "q": query,
            "indent": true,
            "q.op": "OR",
            "rows": rows
        }
    }).then(res => {
        console.log(res.data.response.docs);
        setData(res.data.response.docs);
    }).catch(err => {
        console.log(`The error is ${err}`)
    })
}