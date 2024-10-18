"use client"

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from "react-date-range"
import { useEffect, useRef } from 'react';

const Calender = ({filterData, setFilterData, isDateRangeOpen, setIsDateRangeOpen}) => {
    const selectionRange = {
        startDate: filterData?.startDate,
        endDate: filterData?.endDate,
        key: 'selection',
      }

      const pickerRef = useRef(null)

      const handleSelect = (date) => {
        setFilterData({...filterData, startDate : date.selection.startDate , endDate : date.selection.endDate})
      }
      
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (pickerRef.current && !pickerRef.current.contains(event.target)) {
            setIsDateRangeOpen(false);
          }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
  return (
    <div className='modal' ref={pickerRef}>
      {isDateRangeOpen && <>
        <DateRangePicker
        ranges={[selectionRange]}
        onChange={handleSelect}
      />
      </>}
    </div>
  )
}

export default Calender