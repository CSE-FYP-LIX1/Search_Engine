import React, {useState} from "react";
import { MagGlassSvg } from "../../assets/svgs";
import { BasicDateRangePicker } from "./BasicDateRangePicker";

type InputFieldProps = {
    customStyles : string[]; 
    inputCallback : Function;
    onKeyDownCallback : Function; 
    query? : string;
    updateDateRange : Function;
    startDate: string;
    endDate: string;
}

export const InputField = ({customStyles, inputCallback, onKeyDownCallback, query, updateDateRange, endDate, startDate} : InputFieldProps) : JSX.Element => {
    const baseClass = ["flex", "flex-row", "shadow", "appearance-none", "rounded-full", "px-3", "text-gray-700", "mb-3", "leading-tight", "focus:outline-none", "focus:shadow-outline", "shadow-lg", "border-[1px]", "border-black"]
    const finalClass = baseClass.concat(customStyles); 

    const handleKeyDown = (event : any) => {
        if (event.key === 'Enter') {
            onKeyDownCallback(); 
        }
    }
    
    return (
        <div className={finalClass.join(" ")}>
            <div className="flex align-middle mt-1">
                <MagGlassSvg width="30px" height="30px"/>
            </div>
            <input className="focus:outline-0 w-full ml-2" value={query} type="text" onChange={(e) => inputCallback(e.target.value)} onKeyDown={handleKeyDown}/>
            <div className="w-1/2">
                <BasicDateRangePicker updateDateRange={updateDateRange} startDate={startDate} endDate={endDate}/>
            </div>
        </div>
    )
}