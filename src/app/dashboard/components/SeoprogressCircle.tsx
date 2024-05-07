import { RootState } from '@/app/store';
// import { PerformanceMetrics } from '@/types/DashboardOverview';
import { FC } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
const SEOProgressiveCircle: FC = () => {

  const {metrics} = useSelector((state: RootState) => state.technicalSeo);
  // const scores = metrics?.metrics?.data[0].performance ?? null;
  const scores = metrics?.data[0].performance || null;
  
 
  
  const averageSeo  = scores && scores * 100
  



  return (
   <div className="z-0">
     <CircularProgressbarWithChildren value={averageSeo ??0} className='' styles={{
      path: { stroke: averageSeo && averageSeo < 40 ? "#D92D20" : averageSeo && averageSeo > 40 && averageSeo < 70 ? "#FDB022" : "#039855" }
    }} >
      <div className="flex flex-col">
        <p className='text-gray-600 text-center text-sm'> SEO score</p>
        <p className='text-gray-900 text-center text-5xl'> {averageSeo?.toFixed(0)}% </p>
      </div>
    </CircularProgressbarWithChildren>
   </div>
  );
};

export default SEOProgressiveCircle;

