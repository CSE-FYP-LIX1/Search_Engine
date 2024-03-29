/*eslint-disable*/
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
import { MultiInputField } from "../common/Components/MultiInputField.jsx";

const StockTrends = () => {
    const defaultEndDate = new Date();
    const [startDate, setStartDate] = useState(
        (defaultStartDate.getMonth() + 1) + "/" + defaultStartDate.getDate() + "/" + defaultStartDate.getFullYear()
    );
    const [endDate, setEndDate] = useState(
        (defaultEndDate.getMonth() + 1) + "/" + defaultEndDate.getDate() + "/" + defaultEndDate.getFullYear()
    );
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate(); 

    const navigateWithRange = (startDate, endDate, searchArray) => {
        if (startDate === null || endDate === null || startDate === "" || endDate === "") {
            setErrorMessage("*A date range is required");
            return 
        }


        if (searchArray.length > 0) {
            const uniqueArray = searchArray.filter((item, index) => searchArray.indexOf(item) === index);

            navigate({
                pathname: "/stock-trends-results",
                search: createSearchParams({
                    startDate: startDate,
                    endDate: endDate,
                    query: uniqueArray.join(",")
                }).toString()
            })
        } else {
            navigate({
                pathname: "/stock-trends-results",
                search: createSearchParams({
                    startDate: startDate,
                    endDate: endDate
                }).toString()
            })
        }
        console.log(searchArray)
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

    const [searchArray, setSearchArray] = useState([]); 
    return (
        <div className="flex flex-col gap-8">
            <div className="flex flex-col text-3xl py-[5vh] bg-[#283454]">
                <div className="flex flex-row mx-auto text-white">
                    Topic Insight Multi-Search&nbsp;
                </div>
                <div className="flex flex-row mx-auto text-white text-lg">
                    Leave the Search Empty To Get The Top 5 Topics During the Selected Time Range
                </div>
                <div className="mx-auto mt-4">
                    <ImageNavBar 
                        ImageNavElements={ImageNavElements}
                    />
                </div>
            </div>
            <div className="flex flex-row gap-40 mx-auto">
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
            <div className="mx-auto w-1/6 mb-5">
                <BasicDateRangePicker updateDateRange={setDateRange} startDate={dateRange.startDate} endDate={dateRange.endDate} />
            </div>
            <div className="mx-auto w-2/3">
                <MultiInputField customStyles={[]} inputCallback={setSearchArray}/>
            </div>
            {/* <div className="flex flex-row justify-center gap-[20vw]">
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
            </div> */}
            <div className="text-base font-bold text-red-500 text-center">
                {errorMessage}
            </div>
            <div className="mx-auto">
                <Button 
                    buttonCallback={()=>navigateWithRange(dateRange.startDate, dateRange.endDate, searchArray)}
                    customStyles={["w-[200px]"]}
                >
                    Search
                </Button>
            </div>
        </div>
    )
}

export default StockTrends; 