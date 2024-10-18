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
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/data`)
    return res.json()
  } catch (error) {
    console.log(error.message)
  }
}

export default async function Home() {
  if(!process.env.NEXT_PUBLIC_DOMAIN) {
    return null;
}
  const {data} = await fetchData();
  console.log(data.length)
  return (
    <div className={styles.page} >
        <Suspense fallback = {<Loading />}>
          <BarChart dataset = {data}/>
        </Suspense>
        <LineChart />
    </div>
  );
}
