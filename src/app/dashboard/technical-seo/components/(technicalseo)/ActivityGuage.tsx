import { RootState } from "@/app/store";
import {ActivityRings} from "@jonasdoesthings/react-activity-rings";

// Basic example with no custom settings
import React from 'react'
import { useSelector } from "react-redux";

export default function ActivityGuage() {
  const siteIssues = useSelector((state: RootState)=> state.technicalSeo.siteIssue)
  return (
    <div className="h-full w-full">
      <ActivityRings rings={[
  // {filledPercentage: siteIssues && siteIssues?.notices/100, color: '#F04438'},
  {filledPercentage: siteIssues && siteIssues?.error/100, color: '#F04438'},
  {filledPercentage: siteIssues && siteIssues?.warning/100, color: '#FDB022'},
  {filledPercentage: siteIssues && siteIssues?.notices/100, color: '#175CD3'},
]}
options={{
  initialRadius: 40,
  animationDurationMillis: 1500,
  containerHeight: '30vh',
  backgroundOpacity: 0.1
}} 
/>


    </div>
  )
}


export function sampleACtivityGuage() {
return (
  <div className=" h-[200px] w-[200px] bg-blue-500  rounded-full">
      <div className="w-[170px] h-[170px] bg-yellow-700 rounded-full ">
.
      </div>
  </div>
)
}