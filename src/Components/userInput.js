import React from 'react';

const UserInput = (props) => {
    // const [query, setQuery] = useState("russia");
    // const [fetchFields, setFetchFields] = useState("content");

    const onSubmit = (event) => {
        event.preventDefault();
        // <Ting query={query} fetchFields={fetchFields} />
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <p>
                    <h3>Query:</h3>
                    <input type="text" value={props.query} 
                    onChange={e => {props.setQuery(e.target.value)}}/>
                </p>
                <button type='submit' className='submitButton'>
                    Search
                </button>
            </form>
        </div>
    )
}

export default UserInput;