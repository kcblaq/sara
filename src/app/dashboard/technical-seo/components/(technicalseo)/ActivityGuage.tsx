import { RootState } from "@/app/store";
import {ActivityRings} from "@jonasdoesthings/react-activity-rings";

// Basic example with no custom settings
import React from 'react'
import { useSelector } from "react-redux";


export default function ActivityGuage() {
  const siteIssues = useSelector((state: RootState)=> state.technicalSeo.metrics?.siteIssue)

  // Add nullish coalescing to ensure that the values are always numbers
  const errorPercentage = siteIssues?.error ?? 0;
  const warningPercentage = siteIssues?.warning ?? 0;
  const noticesPercentage = siteIssues?.notices ?? 0;

  return (
    <div className="h-full w-full">
      <ActivityRings rings={[
        { filledPercentage: errorPercentage / 100, color: '#F04438' },
        { filledPercentage: warningPercentage / 100, color: '#FDB022' },
        { filledPercentage: noticesPercentage / 100, color: '#175CD3' },
      ]}
      options={{
        initialRadius: 40,
        animationDurationMillis: 1500,
        containerHeight: '30vh',
        backgroundOpacity: 0.1
      }}
      />
    </div>
  )}