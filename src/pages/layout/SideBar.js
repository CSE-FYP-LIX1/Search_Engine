import React from 'react'; 
import { Outlet } from "react-router-dom";
// import { Tabs } from "../../common/Components/Tabs.tsx";
// import { useState } from "react";

const SideBar = () => {
    return (
        <div className="w-full h-full flex flex-col font-source-sans-pr">
            <div className="w-full basis-full h-[100vh]">
                <Outlet/>
            </div>
        </div>
    )
}

export default SideBar; 