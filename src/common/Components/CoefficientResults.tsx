import React from "react"

type CoefficientResult = {
    Keyword: string,
    corr_coeff: number, 
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
                            <div className="flex flex-row text-xl" key={"CoefficientResult" + idx}>
                                <div className="font-bold">
                                    {idx + 1}.
                                </div>
                                &nbsp;&nbsp;{elem.Keyword[0]}&nbsp;&nbsp;~&nbsp;&nbsp;{elem.corr_coeff[0].toFixed(3)}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}