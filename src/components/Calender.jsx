"use client"

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {DateRangePicker} from "react-date-range"
import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const Calender = ({filterData, setFilterData, isDateRangeOpen, setIsDateRangeOpen,handleFilterChange}) => {
    const selectionRange = {
        startDate: filterData?.startDate,
        endDate: filterData?.endDate,
        key: 'selection',
      }

      const searchParams = useSearchParams()

      const router = useRouter()

      const pickerRef = useRef(null)

      const handleSelect = (date) => {
        const params = new URLSearchParams(searchParams.toString());
        if (date?.selection?.startDate && date?.selection?.endDate) {
          params.set('startDate', date?.selection?.startDate);
          params.set('endDate', date?.selection?.endDate);

        } else {
          params.delete('startDate');
          params.delete('endDate');
        }
        router.push(`?${params.toString()}`, { shallow: true });
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