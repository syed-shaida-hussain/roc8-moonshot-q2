import BarChart from "@/components/BarChart";
import styles from "./page.module.css";
import LineChart from "@/components/LineChart";

const fetchData = async()  => {
  const res = await fetch("http://localhost:3000/api/data");
  return res.json()
}

export default async function Home() {
  const {data} = await fetchData();
  return (
    <div className={styles.page} >
        <BarChart dataset = {data} />
        <LineChart />
    </div>
  );
}
