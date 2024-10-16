"use client"

import styles from "@/app/page.module.css"
import { Bar } from "react-chartjs-2";
import { Chart as ChartJs, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js"
import zoomPlugin from "chartjs-plugin-zoom";
import { options } from "@/constants/options";
import { useRef } from "react";


ChartJs.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title, zoomPlugin)

const BarChart = ({dataset}) => {
    const chartRef = useRef(null);
    const startDate = "4/10/2022"
    const endDate = "6/10/2022"

    const filteredDataByDay = dataset.filter(item => {
        const itemDate = new Date(item.Day);
        return itemDate >= new Date(startDate) && itemDate <= new Date(endDate);
    });

    const filteredDataByGender = filteredDataByDay.filter(item => {
        return item.Gender === "Male"
    })

    const filteredDataByAge = filteredDataByGender.filter(item => {
        return item.Age === "15-25"
    })

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
    
          console.log(`Clicked on: ${label}, Value: ${value}`);
        }

      };

      const resetZoomHandler = () => {
        if (chartRef.current) {
            chartRef.current.resetZoom();
          }
        }

  return (
    <div className= {styles.barChart}>
        <Bar data={data} options={options} ref={chartRef} onClick={handleBarClick}/>
        <button onClick={resetZoomHandler}>Reset zoom</button>
    </div>
  )
}

export default BarChart