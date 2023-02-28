import React from "react";
import { useSearchParams } from 'react-router-dom';


const StockTrendsResults = () => {
    const [searchParams] = useSearchParams(); 
    const startDate = searchParams.get("startDate"); 
    const endDate = searchParams.get("endDate");

    return (
        <div>
            {startDate} &nbsp; {endDate} 
        </div>
    )
}

export default StockTrendsResults; 