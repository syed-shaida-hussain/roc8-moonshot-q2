import BarChart from "@/components/BarChart";
import styles from "./page.module.css";
import LineChart from "@/components/LineChart";
import 'react-date-range/dist/styles.css'; // Main style file
import 'react-date-range/dist/theme/default.css'; // Theme css file


const fetchData = async()  => {
  const res = await fetch("http://localhost:3000/api/data");
  return res.json()
}

const importData = async () => {
  const res = await fetch("http://localhost:3000/api/google-sheet-data");
  return res.json();
}

export default async function Home() {
  const {data} = await fetchData();
  const {sheetData} = await importData();
  return (
    <div className={styles.page} >
        <BarChart dataset = {sheetData} data2 = {data} />
        <LineChart />
    </div>
  );
}
