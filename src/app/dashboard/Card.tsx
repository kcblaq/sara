
import { FaArrowUp } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { formatDate } from '@/lib/DateFormater';
import { ShortenNumber } from '../utils/ShortenedNumber';

interface Props {
  title: string;
  amount: number | undefined | string;
  style: string;
  percent: number | undefined | string;
  arrowPosition?: string;
  chart: React.ReactNode
}


export default function Card({ title,  style, amount, percent, chart, arrowPosition }: Props) {
  
  const {metrics, loading, error} = useSelector((state: RootState)=> state.performance)
  const temp = metrics && metrics?.history?.scores  ;
  const lastScore = temp &&  temp[0] ;
  let lastUpdated: string | undefined;
  if (lastScore?.createdAt) {
    lastUpdated = formatDate({ inputDate: lastScore.createdAt });
} else {
    ''
}
 

  // const latestDate = formatDate()

  // const chartData = {
  //   labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  //   datasets: [
  //     {
  //       label: 'Monthly Sales',
  //       data: [65, 59, 80, 81, 56, 55],
  //       fill: false,
  //       borderColor: 'rgb(75, 192, 192)',
  //       tension: 0.1,
  //     },
  //   ],
  // };

  const options = {
    scales: {
      x: {
        type: 'category', // Correctly set the type to 'category'
      },
    },
  } as const;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[390px] h-[176px] rounded-md p-6 border ">
      <div className="flex w-full justify-between items-center">
        <h5 className=" font-semibold text-base">{title}</h5>
        <p className=" text-sm font-normal">{lastUpdated} </p>
      </div>
      <div className="grid">
        <h1 className=" self-start font-semibold text-4xl"> {amount} </h1>
        <div className="flex items-center justify-between w-full">
          <p className="flex items-center gap-2 text-sm">
            {/* <span className={style} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <FaArrowUp className={arrowPosition}/> {percent && percent?.toFixed(1)}%
            </span> */}
            <span className={style} style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
  <FaArrowUp className={arrowPosition}/> {typeof percent === 'number' ? percent.toFixed(1) : percent}%
</span>
            vs last update
          </p>
          <p className='p-2 float-end'>
            {/* <Line data={chartData} options={options} /> */}
            {/* <BarChart data1={0} data2={20} data3={60} /> */}
            {chart}
          </p>
        </div>
      </div>
    </div>
  );
}

