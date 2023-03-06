import React from "react";
import { ReactElement } from "react";

type ImageNavElement = {
    link : string; 
    svg : ReactElement; 
    hoverText : string;
}

type ImageNavBarProps = {
    ImageNavElements : ImageNavElement[];
}

const ImageNavBar = ({ImageNavElements} : ImageNavBarProps) => {
    return (
        <div className="">
            {
                ImageNavElements.map((elem) => {
                    return (
                        <div className="flex flex-row overflow-hidden w-12 h-12 px-1 transition-all hover:w-[300px] duration-1000 bg-white rounded-full   ">
                            <div className="my-auto">
                                {
                                    elem.svg
                                }
                            </div>
                            <div className="my-auto text-center">
                                {elem.hoverText}
                            </div>
                        </div>

                        
                    )
                })
            }
        </div>
    )
}

export default ImageNavBar; 