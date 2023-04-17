import React, {useState} from "react";
import { MagGlassSvg, XSvg } from "../../assets/svgs";

export const MultiInputField = ({onAdd, customStyles, inputCallback}) => {
    const [currentInput, setCurrentInput] = useState("")
    const [selectedInputs, setSelectedInputs] = useState([]); 
    const inputBaseClass = ["w-1/4", "py-2", "flex", "flex-row", "shadow", "appearance-none", "rounded-full", "px-3", "text-gray-700", "mb-3", "leading-tight", "focus:outline-none", "focus:shadow-outline", "shadow-lg", "border-[1px]", "border-black"]
    const buttonBaseClass = ["py-2", "text-white", "bg-black", "rounded-full", "font-medium", "hover:bg-[#814545]", "w-20", "h-10", "mt-1"]

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            if (currentInput !== "" && currentInput.trim() !== "" && currentInput.replaceAll("\"", "").replaceAll("'").replaceAll("`") !== "")
                handleSubmit(event)
        }
    }

    const handleSubmit = (e) => {
        selectedInputs.push(currentInput.trim()); 
        setCurrentInput("") 
        inputCallback(selectedInputs); 
    }

    return (
        <div>
            <div className="flex flex-row gap-4 justify-center">
                <div className={inputBaseClass.join(" ")}>
                    <div className="flex align-middle mt-1">
                        <MagGlassSvg width="30px" height="30px"/>
                    </div>
                    <input className="focus:outline-0 ml-2 bg-[#F9FBFD]" type="text" value={currentInput} onChange={(e) => setCurrentInput(e.target.value)} onKeyDown={handleKeyDown}/>
                </div>
                <button className={buttonBaseClass.join(" ")} onClick={() => handleSubmit()}>
                    Add
                </button>
            </div>
            <div className="flex flex-row gap-4 flex-wrap w-full">
                {
                    selectedInputs.map((elem) => {
                        return (
                            <div className="flex flex-row justify-between h-8 rounded-md bg-[#f2f0f1]">
                                <div className="table">
                                    <div className="pl-4 table-cell align-middle">{elem}</div>
                                </div>
                                <div className="table ml-4">
                                    <div className="table-cell align-middle hover:cursor-pointer">
                                        <XSvg width={"16px"} height={"16px"} onClick={() => {
                                            let removedArray = selectedInputs.filter(item => item !== elem);
                                            const newArray = [...removedArray];
                                            console.log(newArray);
                                            inputCallback(newArray); 
                                            setSelectedInputs(newArray);
                                        }}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}