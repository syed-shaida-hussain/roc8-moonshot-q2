 "use client";

import React, { Suspense, useState } from 'react'
import styles from "../app/page.module.css";
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useSearchParams } from 'next/navigation';
import { getCookie } from 'cookies-next';
const BarChart = dynamic(() => import("@/components/BarChart"), {
    ssr: false,
  });
  const LineChart = dynamic(() => import("@/components/LineChart"), {
    ssr: false,
  });

const PageWrapper = ({dataset}) => {
    const searchParams = useSearchParams();
    const initialFilterData = {
        gender : searchParams.get("gender") || getCookie("gender") || "",
        startDate : searchParams.get("startDate") || new Date(2022, 8, 6),
        endDate : searchParams.get("endDate") || new Date(2022, 8, 9),
        age : searchParams.get("age") || getCookie("age") || "",
        lineGraphFeature : null,
        lineGraphValue : null
    }
    const [filterData , setFilterData] = useState(initialFilterData)
  return (
    <div className={styles.page} >
    <Suspense fallback = {<Loading />}>
      <BarChart dataset = {dataset} filterData = {filterData} setFilterData = {setFilterData} initialFilterData = {initialFilterData} />
      {filterData?.lineGraphFeature && <LineChart dataset = {dataset} filterData = {filterData} setFilterData = {setFilterData} />}
    </Suspense>
</div>
  )
}

export default PageWrapper