import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../common/Components/Button.tsx";
import { defaultStartDate } from "../constants"; 
import { MagGlassSvg, PlusMinusSvg } from "../assets/svgs";
import ImageNavBar from "../common/Components/ImageNavBar.tsx";
import { BasicDateRangePicker } from '../common/Components/BasicDateRangePicker.jsx';


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

    const [curStartDate, setCurStartDate] = useState(minDate); 
    const [curEndDate, setCurEndDate] = useState(maxDate);
    const [dateRange, setDateRange] = useState({
        startDate: "",
        endDate: ""
    });

    const ImageNavElements = [
        {link: "/search", svg: <MagGlassSvg width={"28px"} height={"28px"} />, hoverText: "Go to the search engine to search for specific topics", title: "Search Engine"},
        {link: "/trendiest-topics", svg: <PlusMinusSvg width={"28px"} height={"28px"} />, hoverText: "Go to the ranking of all topics overtime", title: "Trendiest Topics"}
    ]

    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-3xl py-[5vh] bg-[#283454]">
                <div className="flex flex-row mx-auto text-white">
                    Select the date range to view the most&nbsp;
                    <div className="font-bold">relevant topics</div>
                </div>
                <div className="flex flex-row mx-auto text-white">
                    and their impact on the&nbsp;
                    <div className="font-bold">S&P500 Index</div>
                </div>
                <div className="mx-auto mt-4">
                    <ImageNavBar 
                        ImageNavElements={ImageNavElements}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-20 mx-auto">
                <div className="flex flex-col">
                    <div className="text-2xl font-bold text-center"> 
                        From:
                    </div>
                    <div className="text-2xl font-medium text-center">
                        {dateRange.startDate}
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="text-2xl font-bold text-center"> 
                        To:
                    </div>
                    <div className="text-2xl font-medium text-center">
                        {dateRange.endDate}
                    </div>
                </div>
            </div>
            <div className="mx-auto w-1/6">
                <BasicDateRangePicker updateDateRange={setDateRange} startDate={dateRange.startDate} endDate={dateRange.endDate} />
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
                                setCurStartDate(new Date(newValue.$y + "-" + tempMonth + "-" + newValue.$D))
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
                            minDate={curStartDate}
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