import React, {useState} from "react";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { StaticDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Button } from "../common/Components/Button.tsx";

const StockTrends = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    const [startDate, setStartDate] = useState(
        defaultStartDate.getMonth() + "/" + defaultStartDate.getDate() + "/" + defaultStartDate.getFullYear()
    );
    const [endDate, setEndDate] = useState(
        defaultEndDate.getMonth() + "/" + defaultEndDate.getDate() + "/" + defaultEndDate.getFullYear()
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

    return (
        <div className="flex flex-col gap-8 my-[5vh]">
            <div className="flex flex-col text-3xl">
                <div className="flex flex-row mx-auto">
                    Select the date range to view the most&nbsp;
                    <div className="font-bold">relevant topics</div>
                </div>
                <div className="flex flex-row mx-auto">
                    and their impact on the&nbsp;
                    <div className="font-bold">S&P500 Index</div>
                </div>
            </div>
            <div className="flex flex-row justify-center gap-[20vw]">
                <div className="flex flex-col gap-4">
                    <div className="text-3xl font-bold text-center"> 
                        From: {startDate}
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
                        />
                    </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-3xl font-bold text-center">
                        To: {endDate}
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            orientation="portrait"
                            openTo="day"   
                            value={endDate}
                            onChange={(newValue) => {
                                let tempMonth = newValue.$M + 1;
                                setEndDate(tempMonth + "/" + newValue.$D + "/" + newValue.$y);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            componentsProps={{ actionBar: { actions: [] }}}
                            showToolbar={false}
                        />
                    </LocalizationProvider>
                </div>
            </div>
            <div>
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