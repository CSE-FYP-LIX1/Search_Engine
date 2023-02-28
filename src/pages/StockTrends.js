import React, {useState} from "react";
// import Datepicker from "react-tailwindcss-datepicker";
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { CalendarPicker, StaticDatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from '@mui/x-date-pickers';

const StockTrends = () => {
    const defaultStartDate = new Date();
    const defaultEndDate = new Date();
    const [startDate, setStartDate] = React.useState(
        defaultStartDate.getMonth() + "/" + defaultStartDate.getDate() + "/" + defaultStartDate.getFullYear()
    );
    const [endDate, setEndDate] = React.useState(
        defaultEndDate.getMonth() + "/" + defaultEndDate.getDate() + "/" + defaultEndDate.getFullYear()
    );

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
                        From
                    </div>
                    <div className="text-xl font-bold text-center">
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
                        />
                    </LocalizationProvider>
                </div>
                <div className="flex flex-col gap-4">
                    <div className="text-3xl font-bold text-center">
                        To
                    </div>
                    <div className="text-xl font-bold text-center">
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
                            }}
                            renderInput={(params) => <TextField {...params} />}
                            componentsProps={{ actionBar: { actions: [] }}}
                            showToolbar={false}
                        />
                    </LocalizationProvider>
                </div>
            </div>
        </div>
    )
}

export default StockTrends; 