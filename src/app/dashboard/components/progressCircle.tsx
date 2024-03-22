import { FC} from 'react';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
const ProgressiveCircle: FC = () => {

  return (
    <CircularProgressbarWithChildren value={40} className='' styles={{
      path:{stroke: 'red' }
    }} >
     <div className="flex flex-col">
      <p className='text-gray-600 text-center text-sm'> SEO score</p>
      <p className='text-gray-900 text-center text-5xl'> 40% </p>
     </div>
  </CircularProgressbarWithChildren>
  );
};

export default ProgressiveCircle;

