"use client"

import React, { Suspense, useState } from 'react'
import styles from "@/app/page.module.css"
import Calender from './Calender';
import { useRouter, useSearchParams } from 'next/navigation';
import Loading from '@/app/loading';

const Filters = ({filterData,setFilterData}) => {
    const searchParams = useSearchParams();
    const {gender,age} = filterData;
    const router = useRouter()
    const [isDateRangeOpen , setIsDateRangeOpen] = useState(false)

    const handleFilterChange = (key, value) => {
        const newFilterData = { ...filterData, [key]: value || undefined };
        setFilterData(newFilterData);
        const params = new URLSearchParams(searchParams);

        if (value) {
          params.set(key, value);
        } else {
          params.delete(key);
        }
        router.push(`/?${params.toString()}`, { shallow: true });
      };

      const logout = async () => {
        try {
          const res = await fetch("/api/user/logout")
          router.push('/login')
        } catch (error) {
          console.log(error)
        }
      }

  return (
    <section className= {`${styles.filters} flex-col gap-10 filters`} >
    <span className='mb-10'>Filters :</span>
    <ul className="flex-col gap-10">
        <li className="flex-col gap-10">
        <select
        name='gender'
        value={gender}
        onChange={(e) => handleFilterChange("gender" , e.target.value) }>
        <option value="">Gender</option>
        
        <option value="Male">
            Male
        </option>
        <option value="Female">Female</option>
      </select>
        </li>  
        <li className="flex-col gap-10">
        <select
        value={age}
        name='age'
        onChange={(e) => handleFilterChange("age" , e.target.value) }>
        <option value="">Age</option>
        <option value="15-25">15-25</option>
        <option value=">25">{">25"}</option>
      </select>
        </li>
        <li className="flex-col gap-10">
            <span className="">Date </span>
            <button className='pl-10 range-btn btn' onClick={() => setIsDateRangeOpen(true)}>Custom Range</button>
            <span className='btn mt-20' onClick={() => logout()}>Logout</span>

            <Suspense fallback = {<Loading />}>
              <Calender isDateRangeOpen={isDateRangeOpen} setIsDateRangeOpen = {setIsDateRangeOpen} filterData={filterData} setFilterData={setFilterData} />
            </Suspense>
             
        </li>
    </ul>
</section>
  )
}

export default Filters