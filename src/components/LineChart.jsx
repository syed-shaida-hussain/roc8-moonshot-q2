"use client";
import  { Line } from "react-chartjs-2";
import { Chart as ChartJs, LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip} from "chart.js";
import styles from "@/app/page.module.css"
import { useSearchParams } from "next/navigation";
import { getFilteredDataByDay } from "@/utils/filteredDataByDay";
import { getFilteredDataByGender } from "@/utils/filteredDataByGender";
import { getFilteredDataByAge } from "@/utils/filteredDataByAge";
import { useRef } from "react";

ChartJs.register(LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip)

const LineChart = ({dataset , filterData}) => {
    const searchParams = useSearchParams();
    const lineRef = useRef(null);
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    const gender = searchParams.get('gender')
    const age = searchParams.get('age')

    const filteredDataByDay = getFilteredDataByDay(dataset,startDate,endDate)

    const filteredDataByGender = getFilteredDataByGender(filteredDataByDay, gender)

    const filteredDataByAge = getFilteredDataByAge(filteredDataByGender, age)

    const formatDate = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleDateString('en-GB', {
          day: '2-digit',
          month: 'short',
        });
      };

     const options = {
        responsive : true,
        maintainAspectRatio: false,
        scales : {
            y : {
                title : {
                    display : true,
                    text : `Time trend of ${filterData?.lineGraphFeature}` ,
                    font : {
                        size : 18
                    }
                }
            },
            x : {
                title : {
                    display : true,
                    text : "Date",
                    font : {
                        size : 18
                    }
                },
            }
        },
        plugins: {
            tooltip: { enabled: true },
            zoom: {
              pan: {
                enabled: true,
                mode: "x",
              },
              zoom: {
                wheel: {
                  enabled: true,
                },
                pinch: {
                  enabled: true,
                },
                mode: "x",
              },
            },
          },
        indexAxis : 'x'
    }
    const sumOfFeatureByDate = (arr) => {
      const totals = arr.reduce((acc, item) => {
        const date = item.Day.split('T')[0];
        if (!acc[date]) {
          acc[date] = 0;
        }
        acc[date] += item[filterData?.lineGraphFeature];
        return acc;
      }, {});
    
      return Object.entries(totals).map(([date, totalFeature]) => ({
        Day: date,
        totalFeature: totalFeature
      }));
    };
    const lineChartLabels = filteredDataByAge.map(item => formatDate(item?.Day))
    const lineChartData = sumOfFeatureByDate(filteredDataByAge)
      const data = {
        labels : [...new Set(lineChartLabels)],
        datasets : [
            {
                label : "Total Time",
                data : lineChartData.map(item => item.totalFeature),
                backgroundColor : "#3b82f6",
                borderColor : "#3b82f6",
                pointBorderColor : "#3b82f6",
            }
        ]
    }
    const resetZoomHandler = () => {
      if (lineRef.current) {
          lineRef.current.resetZoom();
        }
      }

  return (
    <div className= {styles.lineChart}>
        <Line data={data} options={options} ref={lineRef} />
        <button className="btn" onClick={resetZoomHandler}>Reset zoom</button>
    </div>
  )
}

export default LineChart