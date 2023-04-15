import React, {useState} from "react";
import Datepicker from 'react-tailwindcss-datepicker';

export const BasicDateRangePicker = ({updateDateRange}) => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const handleDateRangeChange = (newValue) => {
    setDateRange(newValue); 
    updateDateRange(newValue); 
    
  } 

  return (
    <div>
      <Datepicker
        value={dateRange}
        onChange={handleDateRangeChange}
        separator={" to "}  
        startFrom={dateRange.startDate}
        showFooter={true}
        minDate={new Date("2006-10-31")} 
        maxDate={new Date(dateRange.endDate)} 
      />  
    </div>
  )
}