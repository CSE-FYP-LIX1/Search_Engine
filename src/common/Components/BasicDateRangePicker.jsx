import React, {useState} from "react";
import Datepicker from 'react-tailwindcss-datepicker';

export const BasicDateRangePicker = ({updateDateRange, startDate, endDate}) => {
  const [dateRange, setDateRange] = useState({
    startDate: "",
    endDate: ""
  });

  const startingValue = {
    startDate: startDate === null ? "" : startDate, 
    endDate: endDate === null ? "" : endDate
  };

  const handleDateRangeChange = (newValue) => {
    if (newValue.startDate == null) {
      setDateRange({startDate: "", endDate: ""})
    } else {
      setDateRange(newValue); 
    }
    updateDateRange(newValue); 
  } 
  return (
    <div>
      <Datepicker
        value={startingValue}
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