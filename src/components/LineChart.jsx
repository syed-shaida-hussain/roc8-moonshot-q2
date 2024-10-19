"use client";
import  { Line } from "react-chartjs-2";
import { Chart as ChartJs, LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip} from "chart.js";
import styles from "@/app/page.module.css"
import { useSearchParams } from "next/navigation";

ChartJs.register(LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip)

const LineChart = ({dataset}) => {
    const searchParams = useSearchParams();
    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")

    const filteredDataByDay = dataset.filter(item => {
        if(!startDate && !endDate) return dataset
        const itemDate = new Date(item.Day);
        return itemDate >=new Date(startDate) && itemDate <= new Date(endDate);
    });
    console.log(filteredDataByDay)
     const options = {
        responsive : true,
        maintainAspectRatio: false,
        scales : {
            y : {
                title : {
                    display : true,
                    text : "Features",
                    font : {
                        size : 18
                    }
                }
            },
            x : {
                title : {
                    display : true,
                    text : "Total time spent",
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
    const data = {
        labels : ["Mon", "Tue" , "Wed" , "Thu" , "Fri" , "Sat"],
        datasets : [
            {
                label : "Total Time",
                data : [2,6,4,8,10,12],
                backgroundColor : "#3b82f6",
                borderColor : "#3b82f6",
                pointBorderColor : "#3b82f6",
            }
        ]
    }
  return (
    <div className= {styles.lineChart}>
        <Line data={data} options={options} />
    </div>
  )
}

export default LineChart