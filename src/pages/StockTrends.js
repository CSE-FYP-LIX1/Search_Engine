import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../common/Components/Button.tsx";
import { defaultStartDate } from "../constants"; 
import { MagGlassSvg } from "../assets/svgs";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";


const StockTrends = () => {
    const defaultEndDate = new Date();
    const [startDate, setStartDate] = useState(
        (defaultStartDate.getMonth() + 1) + "/" + defaultStartDate.getDate() + "/" + defaultStartDate.getFullYear()
    );
    const [endDate, setEndDate] = useState(
        (defaultEndDate.getMonth() + 1) + "/" + defaultEndDate.getDate() + "/" + defaultEndDate.getFullYear()
    );

    const navigate = useNavigate(); 

    const navigateWithRange = (startDate, endDate) => {
        navigate({
            pathname: "/stock-trends-results",
            search: createSearchParams({
                startDate: startDate,
                endDate: endDate
            }).toString()
        })
    }

    const minDate = new Date("2006-11-01"); 
    const maxDate = new Date("2023-12-31");
    const [curEndDate, setCurEndDate] = useState(new Date());
    
    const ImageNavElements = [
        {link: "/search", svg: <MagGlassSvg width={"28px"} height={"28px"} />, hoverText: "Go to the search engine to search for specific topics"}
    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-3xl py-[5vh] bg-background-blue">
                <div className="flex flex-row mx-auto">
                    Select the date range to view the most&nbsp;
                    <div className="font-bold">relevant topics</div>
                </div>
                <div className="flex flex-row mx-auto">
                    and their impact on the&nbsp;
                    <div className="font-bold">S&P500 Index</div>
                </div>
                <div className="mx-auto mt-4">
                    <ImageNavBar 
                        ImageNavElements={ImageNavElements}
                    />
                </div>
            </div>
            <div className="flex flex-row justify-center gap-[20vw]">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold text-center"> 
                        From:
                    </div>
                    <div className="text-2xl font-medium text-center">
                        {startDate}
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="portrait"
                            openTo="day"   
                            value={startDate}
                            onChange={(newValue) => {
                                let tempMonth = newValue.$M + 1;
                                setStartDate(tempMonth + "/" + newValue.$D + "/" + newValue.$y);
                            }}
                            renderInput={(params) => 
                                <TextField {...params}/>
                            }
                            componentsProps={{ actionBar: { actions: [] } }}
                            showToolbar={false}
                            minDate={new Date(minDate)}
                            maxDate={curEndDate}
                        />
                    </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-2">
                    <div className="text-2xl font-bold text-center">
                        To:
                    </div>
                    <div className="text-2xl font font-medium text-center">
                        {endDate}
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="portrait"
                            openTo="day"   
                            value={endDate}
                            onChange={(newValue) => {
                                let tempMonth = newValue.$M + 1;
                                setEndDate(tempMonth + "/" + newValue.$D + "/" + newValue.$y);
                                setCurEndDate(new Date(newValue.$y + "-" + tempMonth + "-" + newValue.$D)); 
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            componentsProps={{ actionBar: { actions: [] }}}
                            showToolbar={false}
                            minDate={new Date(minDate)}
                            maxDate={new Date(maxDate)}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div className="mx-auto">
                <Button 
                    buttonCallback={()=>navigateWithRange(startDate, endDate)}
                    customStyles={["w-[200px]"]}
                >
                    Search
                </Button>
            </div>
        </div>
    )
}

export default StockTrends; 