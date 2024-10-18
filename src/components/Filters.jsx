import React, { useState } from 'react'
import styles from "@/app/page.module.css"
import Calender from './Calender';

const Filters = ({filterData,setFilterData,initialFilterData}) => {
    const {gender,startDate,endDate,age} = filterData;
    const [isDateRangeOpen , setIsDateRangeOpen] = useState(false)
  return (
    <section className= {`${styles.filters} flex-col gap-10 filters`} >
    <span><button className= "mt-10" onClick={() => setFilterData(initialFilterData)}>Clear all filters</button> </span>
    <ul className="flex-col gap-10">
        <li className="flex-col gap-10">
            <span className="pl-10">Gender</span>
            <label className="pl-20 flex gap-10" htmlFor="male">Male
                <input name="Male" onChange={(e) => setFilterData({...filterData, gender : e.target.name })} type="radio" id="male" checked = {gender === "Male"} />
            </label>
            <label className="pl-20 flex gap-10" htmlFor="female">Female
                <input name="Female" type="radio" onChange={(e) => setFilterData({...filterData, gender : e.target.name })} id="female" checked = {gender === "Female"} />
            </label>
        </li>  
        <li className="flex-col gap-10">
            <span className="pl-10">Age </span>
            <label className="pl-20 flex gap-10" htmlFor="age-15-25">15-25
                <input name="15-25" onChange={(e) => setFilterData({...filterData, age : e.target.name })} type="radio" id="age-15-25" checked = {age === "15-25"} />
            </label>
            <label className="pl-20 flex gap-10" htmlFor="age->25">{">25"}
                <input name=">25" type="radio"  onChange={(e) => setFilterData({...filterData, age : e.target.name })} id="age->25" checked = {age === ">25"} />
            </label>
        </li>
        <li className="flex-col gap-10">
            <span className="pl-10">Date </span>
            <button className='pl-20' onClick={() => setIsDateRangeOpen(true)}>Custom Range</button>
             <Calender isDateRangeOpen={isDateRangeOpen} setIsDateRangeOpen = {setIsDateRangeOpen} filterData={filterData} setFilterData={setFilterData} />
        </li>
    </ul>
</section>
  )
}

export default Filters