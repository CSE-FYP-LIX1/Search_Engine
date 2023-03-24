import React from "react"

type CoefficientResult = {
    topic: string,
    coefficient: number, 
}

type CoefficientResultsProps = {
    titleColor : string,
    title: string,
    data: CoefficientResult[]
}
export const CoefficientResults = ({titleColor, title, data} : CoefficientResultsProps) => {
    return (
        <div className="border solid border-black w-[40vw] h-[60vh] flex flex-col px-16 py-8 gap-8">
            <div className="font-bold text-center text-2xl" style={{color: titleColor}}>
                {title}
            </div>
            <div className="flex flex-col">
                {
                    data.map((elem, idx) => {
                        return (
                            <div className="flex flex-row text-xl">
                                <div className="font-bold">
                                    {idx + 1}.
                                </div>
                                &nbsp;{elem.topic}&nbsp;~&nbsp;{elem.coefficient}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}