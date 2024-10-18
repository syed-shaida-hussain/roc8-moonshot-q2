"use client";
import  { Line } from "react-chartjs-2";
import { Chart as ChartJs, LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip} from "chart.js";
import { options } from "@/constants/options";
import styles from "@/app/page.module.css"

ChartJs.register(LineElement , LinearScale, CategoryScale, PointElement, Legend, Tooltip)

const LineChart = () => {
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