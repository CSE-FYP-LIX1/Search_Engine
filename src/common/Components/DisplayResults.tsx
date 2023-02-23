import React from 'react';

type DisplayResultsProps = {
    id : string;
    title: string;
    source: string;
    sourceName : string;
    releaseDate : string;
    content: string;
}

const DisplayResults = ({id, title, source, sourceName, releaseDate, content} : DisplayResultsProps) : JSX.Element => {

    return (
        <div className='mx-auto w-[85%] text-left font-source-sans-pro'>
            <div className='bg-[#f6f6f6]'>
                <div className='text-green-800'>
                    {source}
                </div>
                <a href={source} className="text-blue-800 font-medium text-xl hover:underline">{title}</a>
                <div className='text-sm'>
                    {id}
                </div>
                <div className='text-ellipsis line-clamp-3'>
                    {content}
                </div>
            </div>
        </div>
    )
}

export default DisplayResults;