 "use client";

import React, { Suspense, useState } from 'react'
import styles from "../app/page.module.css";
import Loading from '@/app/loading';
import dynamic from 'next/dynamic';
import { useSearchParams, useRouter } from 'next/navigation';
const BarChart = dynamic(() => import("@/components/BarChart"), {
    ssr: false,
  });
  const LineChart = dynamic(() => import("@/components/LineChart"), {
    ssr: false,
  });

const PageWrapper = ({dataset}) => {
    const searchParams = useSearchParams();
    const router = useRouter()

    const initialFilterData = {
        gender : searchParams.get("gender") || "",
        startDate : searchParams.get("startDate") || null,
        endDate : searchParams.get("endDate") || null,
        age : searchParams.get("age") || "",
        lineGraphFeature : null,
        lineGraphValue : null
    }
    const [filterData , setFilterData] = useState(initialFilterData)
    const logout = async () => {
      try {
        const res = await fetch("/api/user/logout")
        router.push('/login')
        console.log(res)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div className={styles.page} >
    <button className='btn mt-20' onClick={() => logout()}>Logout</button>
    <Suspense fallback = {<Loading />}>
      <BarChart dataset = {dataset} filterData = {filterData} setFilterData = {setFilterData} initialFilterData = {initialFilterData} />
      {filterData?.lineGraphFeature && <LineChart dataset = {dataset} filterData = {filterData} setFilterData = {setFilterData} />}
    </Suspense>
</div>
  )
}

export default PageWrapper