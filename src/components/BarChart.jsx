"use client"

import styles from "@/app/page.module.css"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js"
import zoomPlugin from "chartjs-plugin-zoom";
import { options } from "@/constants/options";
import { useRef, Suspense } from "react";
import Filters from "./Filters";
import Loading from "@/app/loading";
import { getFilteredDataByDay } from "@/utils/filteredDataByDay";
import { getFilteredDataByAge } from "@/utils/filteredDataByAge";
import { getFilteredDataByGender } from "@/utils/filteredDataByGender";


ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, zoomPlugin)

const BarChart = ({dataset, filterData, setFilterData, initialFilterData}) => {
    const chartRef = useRef(null);

    const {gender,startDate,endDate,age} = filterData;

    const filteredDataByDay = getFilteredDataByDay(dataset,startDate,endDate)

    const filteredDataByGender = getFilteredDataByGender(filteredDataByDay, gender)

    const filteredDataByAge = getFilteredDataByAge(filteredDataByGender, age)

    const aggregatedData = filteredDataByAge.reduce(
    (acc, curr) => {
        for (const key of Object.keys(curr)) {
        if (/^[A-F]$/.test(key)) {
            acc[key] = (acc[key] || 0) + curr[key];
        }
        }
        return acc;
    },
    {}
    );
    
    const featureKeys = Object.keys(aggregatedData); 
    const featureValues = Object.values(aggregatedData);

    const data = {
        labels : featureKeys.reverse(),
        datasets : [
            {
                label : "Total Time",
                data : featureValues.reverse(),
                backgroundColor : "#3b82f6",
                barPercentage : 0.5,
                categoryPercentage : 1
            }
        ]
    }

    const handleBarClick = (event) => {
        const chart = chartRef.current;
        if (!chart) return;
    
        const points = chart.getElementsAtEventForMode(
          event, 
          "nearest",
          { intersect: true },
          true
        );
    
        if (points.length > 0) {
          const point = points[0]; 
          const label = chart.data.labels[point.index]; 
          const value = chart.data.datasets[point.datasetIndex].data[point.index];
          setFilterData({...filterData, lineGraphFeature : label, lineGraphValue : value})
        }
};

      const resetZoomHandler = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
          }
        }

  return (
    <div className = {`${styles.barChartContainer} flex`} >
        <Suspense fallback = {<Loading />}>
            <Filters filterData={filterData} setFilterData={setFilterData} initialFilterData={initialFilterData} />
        </Suspense>
        <div className= {styles.barChart}>
        <Bar data={data} options={options} ref={chartRef} onClick={handleBarClick}/>
        <button className="btn" onClick={resetZoomHandler}>Reset zoom</button>
        </div>
        
    </div>
  )
}

export default BarChart