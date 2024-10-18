// import BarChart from "@/components/BarChart";
import styles from "./page.module.css";
import LineChart from "@/components/LineChart";
import dynamic from "next/dynamic";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Loading from "./loading";
import { Suspense } from "react";

const BarChart = dynamic(() => import("@/components/BarChart"), {
  ssr: false,
});


const fetchData = async()  => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/data`)

  // const res = await fetch("http://localhost:3000/api/data");
  return res.json()
}

const importData = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/google-sheet-data`)
  // const res = await fetch("http://localhost:3000/api/google-sheet-data");
  return res.json();
}

export default async function Home() {
  if(!process.env.NEXT_PUBLIC_DOMAIN) {
    return null;
}
  const {data} = await fetchData();
  const {sheetData} = await importData();
  return (
    <div className={styles.page} >
        <Suspense fallback = {<Loading />}>
          <BarChart dataset = {sheetData} data2={data}  />
        </Suspense>
        <LineChart />
    </div>
  );
}
