import { Outlet } from "react-router-dom";
import { Tabs } from "../../common/Components/Tabs.tsx";
import { useState } from "react";

const SideBar = () => {
    const [curActive, setCurActive] = useState(0); 

    const TabProps = [
        {"title" : "Search Engine", "path" : "/search"},
        {"title" : "Stock Trends" , "path" : "/stock-trends"},
        {"title" : "Market Trends", "path" : "/market-trends"},
    ]
    
    const setCurrentActiveTab = (curActive) => {
        setCurActive(curActive); 
    }

    return (
        <div className="w-full h-full flex flex-col font-source-sans-pro">
            <div className="bg-[#E9F4F9] flex flex-row">
                <div className="w-1/6 text-black text-2xl text-center font-medium">Market Analysis Data Repository</div>
                <div className="w-5/6">
                    <Tabs tabs={TabProps} curActive={curActive} tabsCallback={setCurrentActiveTab}/>
                </div>
            </div>
            <div className="w-full basis-full h-[100vh]">
                <Outlet/>
            </div>
        </div>
    )
}

export default SideBar; 