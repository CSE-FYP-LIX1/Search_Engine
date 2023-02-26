import React from "react"
import { useNavigate } from "react-router-dom";


type Tab = {
    title : string,
    path : string
}

type TabsProps = {
    tabs : Tab[],
    curActive : number,
    tabsCallback : Function,
}



export const Tabs = ({tabs, curActive, tabsCallback} : TabsProps) : JSX.Element => {
    const navigate = useNavigate(); 
    const navigateToPath = (path : string) : void => navigate(path); 

    return (
        <>
            {
                tabs.map((elem, idx) => {
                    return (
                        curActive === idx ? 
                            <button className="mx-auto bg-[#D9D9D9] text-black px-5 py-5 hover:bg-[#D9D9D9] text-2xl font-medium" onClick={() => {
                                tabsCallback(idx); 
                                navigateToPath(elem.path);
                            }}>
                                {elem.title}
                            </button> :
                            <button className="mx-auto bg-[#E9F4F9] text-black px-5 py-5 hover:bg-[#D9D9D9] text-2xl font-medium" onClick={() => {
                                tabsCallback(idx); 
                                navigateToPath(elem.path);
                            }}>
                                {elem.title}
                            </button>
                    )
                })
            }
        </>
    )
}