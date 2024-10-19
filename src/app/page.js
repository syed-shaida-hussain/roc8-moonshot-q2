import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import PageWrapper from "@/components/PageWrapper";

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
  return (
    <PageWrapper dataset={data} />
  );
}
