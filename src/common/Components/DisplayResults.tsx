import React from 'react';

type DisplayResultsProps = {
    id : string;
    title: string;
    source: string;
    sourceName : string;
    releaseDate : string;
    content: string;
    imageLink: string; 
}

const DisplayResults = ({id, title, source, sourceName, releaseDate, content, imageLink} : DisplayResultsProps) : JSX.Element => {
    return (
        <div className='w-1/4 mx-auto text-left font-source-sans-pro p-5' onClick={() => {window.open(source)}}>
            <div className='flex flex-col gap-1 hover:bg-[#f6f6f6]'>
                <div className='w-full align-middle mx-auto h-40 overflow-hidden'>
                    <img className="rounded-lg" src={imageLink}/>
                </div>
                <div className='flex flex-row'>
                    <div className='flex flex-col w-full'>
                        <a href={source} className="text-black font-medium mb-3 text-xl hover:underline text-center font-semibold">{title}</a>
                        <div className='text-ellipsis line-clamp-3 text-lg'>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DisplayResults;