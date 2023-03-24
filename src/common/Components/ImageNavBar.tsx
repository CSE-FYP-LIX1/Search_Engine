import React from "react";
import { ReactElement } from "react";
import { useNavigate } from "react-router-dom";

type ImageNavElement = {
    link : string; 
    svg : ReactElement; 
    hoverText : string;
    title: string;
}

type ImageNavBarProps = {
    ImageNavElements : ImageNavElement[];
}

const ImageNavBar = ({ImageNavElements} : ImageNavBarProps) => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-row justify-between gap-10">
            {
                ImageNavElements.map((elem, idx) => {
                    return (
                        <div key={"ImageNavElement" + idx}>
                            <div className="mx-auto flex flex-row overflow-hidden w-12 h-12 transition-all hover:w-[300px] duration-1000 bg-white rounded-full" onClick={()=>navigate(elem.link)}>
                                <div className="my-auto px-2">
                                    {
                                        elem.svg
                                    }
                                </div>
                                <div className="my-auto text-center text-base px-1">
                                    {elem.hoverText}
                                </div>
                            </div>
                            <div className="text-sm text-center">
                                {elem.title}
                            </div>
                        </div>

                        
                    )
                })
            }
        </div>
    )
}

export default ImageNavBar; 