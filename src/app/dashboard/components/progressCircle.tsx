import { RootState } from '@/app/store';
import { FC } from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
const ProgressiveCircle: FC = () => {

  const { loading, error, metrics } = useSelector((state: RootState) => state.performance);
  const averageScore = metrics?.current.performance.performanceScore
  const average = averageScore && averageScore * 100;

  return (
    <CircularProgressbarWithChildren value={averageScore ? averageScore * 100 : 0} className='' styles={{
      path: { stroke: average && average < 40 ? "#D92D20" : average && average > 40 && average < 70 ? "#FDB022" : "#039855" }
    }} >
      <div className="flex flex-col">
        <p className='text-gray-600 text-center text-sm'> SEO score</p>
        <p className='text-gray-900 text-center text-5xl'> {average?.toFixed(0)}% </p>
      </div>
    </CircularProgressbarWithChildren>
  );
};

export default ProgressiveCircle;

