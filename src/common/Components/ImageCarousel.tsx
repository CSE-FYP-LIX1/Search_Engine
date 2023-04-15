import React from "react";

type suggestedTopic = {
    image : string;
    topic : string;
    topic_summary : string;
}

type ImageCarouselProps = {
    suggestedTopics : suggestedTopic[]; 
}

export const ImageCarousel = ({suggestedTopics} : ImageCarouselProps) : JSX.Element => {

    let reshapedSuggestedTopics : suggestedTopic[][] = []

    const duplicateArr = (arr : suggestedTopic[], times : number) : suggestedTopic[]=>
    Array(times)
        .fill([...arr])
        .reduce((a, b) => a.concat(b));

    
    //Temporarily duplicate the 3 results into 9 MAKE API CALL 9 IN THE FUTURE

    let tempSuggestedTopics = duplicateArr(suggestedTopics, 3); 


    for (let i = 0; i < 9; i+=3) {
        let tempArr : suggestedTopic[]= [];
        tempArr.push(tempSuggestedTopics[i]); 
        tempArr.push(tempSuggestedTopics[i + 1]); 
        tempArr.push(tempSuggestedTopics[i + 2]); 
        reshapedSuggestedTopics.push(tempArr); 
    }

    return (
        <div id="carousel" className="relative" data-te-carousel-init data-te-carousel-slide>
            <div className="absolute right-0 bottom-0 left-0 z-[2] mx-[15%] mb-4 flex list-none justify-center p-0" data-te-carousel-indicators>
                <button type="button" data-te-target="#carousel" data-te-slide-to="0" data-te-carousel-active className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                        aria-current="true" aria-label="Slide 1" />
                {
                    suggestedTopics.map((_elem, idx) => {
                        if (idx > 0)
                            return (
                                <button type="button" data-te-target="#carousel" data-te-slide-to={idx} className="mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer border-0 border-y-[10px] border-solid border-transparent bg-white bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1.0)] motion-reduce:transition-none"
                                    aria-label={`Slide ${idx + 1}`} />
                            )
                        else 
                            return (<></>)
                    })
                }
            </div>
            <div className="relative w-full overflow-hidden after:clear-both after:block after:content-[''] mb-5">
                <div className="relative float-left -mr-[100%] w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                    data-te-carousel-item
                    data-te-carousel-active>
                    {
                        reshapedSuggestedTopics.length > 0 && 

                        <div className="flex flex-row gap-3 justify-center mt-10">
                            <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                <div className="h-2/3 overflow-hidden flex  flex-col align-middle">
                                    <img src={reshapedSuggestedTopics[0][0].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={reshapedSuggestedTopics[0][0].topic} />
                                </div>
                                <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                    {reshapedSuggestedTopics[0][0].topic}
                                </div>
                                <div className="w-1/2 text-center mx-auto text-sm">
                                    {reshapedSuggestedTopics[0][0].topic_summary}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                <div className="h-2/3 overflow-hidden">
                                    <img src={reshapedSuggestedTopics[0][1].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={reshapedSuggestedTopics[0][1].topic} />
                                </div>
                                <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                    {reshapedSuggestedTopics[0][1].topic}
                                </div>
                                <div className="w-1/2 text-center mx-auto text-sm">
                                    {reshapedSuggestedTopics[0][1].topic_summary}
                                </div>
                            </div>
                            <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                <div className="h-2/3 overflow-hidden">
                                    <img src={reshapedSuggestedTopics[0][2].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={reshapedSuggestedTopics[0][2].topic} />
                                </div>
                                <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                    {reshapedSuggestedTopics[0][2].topic}
                                </div>
                                <div className="w-1/2 text-center mx-auto text-sm">
                                    {reshapedSuggestedTopics[0][2].topic_summary}
                                </div>
                            </div>
                        </div>
                    }
                </div>
                {
                    reshapedSuggestedTopics.map((elem, idx) => {
                        if (idx > 0) {
                            return (
                                <div className="relative float-left -mr-[100%] hidden w-full transition-transform duration-[600ms] ease-in-out motion-reduce:transition-none"
                                    data-te-carousel-item>
                                    <div className="flex flex-row gap-3 justify-center mt-10">
                                        <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                            <div className="h-2/3 overflow-hidden">
                                                <img src={elem[0].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={elem[0].topic} />
                                            </div>
                                            <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                                {elem[0].topic}
                                            </div>
                                            <div className="w-1/2 text-center mx-auto text-sm">
                                                {elem[0].topic_summary}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                            <div className="h-2/3 overflow-hidden">
                                                <img src={elem[1].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={elem[1].topic} />
                                            </div>
                                            <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                                {elem[1].topic}
                                            </div>
                                            <div className="w-1/2 text-center mx-auto text-sm">
                                                {elem[1].topic_summary}
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-5 w-1/4 bg-[#F6F6F6]">
                                            <div className="h-2/3 overflow-hidden">
                                                <img src={elem[2].image} className="block mx-auto w-full rounded-lg object-contain mt-3" alt={elem[2].topic} />
                                            </div>
                                            <div className="w-1/2 text-center mx-auto font-bold text-xl">
                                                {elem[2].topic}
                                            </div>
                                            <div className="w-1/2 text-center mx-auto text-sm">
                                                {elem[2].topic_summary}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        } else 
                            return(<></>)
                    })
                }
            </div>
            <button className="absolute top-0 bottom-0 left-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-te-target="#carousel"
                data-te-slide="prev">
                <span className="inline-block h-12 w-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="h-12 w-12">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Previous
                </span>
            </button>
            <button className="absolute top-0 bottom-0 right-0 z-[1] flex w-[15%] items-center justify-center border-0 bg-none p-0 text-center text-black opacity-50 transition-opacity duration-150 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] hover:text-black hover:no-underline hover:opacity-90 hover:outline-none focus:text-black focus:no-underline focus:opacity-90 focus:outline-none motion-reduce:transition-none"
                type="button"
                data-te-target="#carousel"
                data-te-slide="next">
                <span className="inline-block h-12 w-12">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="3"
                        stroke="currentColor"
                        className="h-12 w-12">
                        <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </span>
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                    Next
                </span>
            </button>
        </div>
    )
}
