import { useRef, useState } from 'react';
import Image from 'next/image';
import PlainButton from '@/app/component/PlainButton';
import { ButtonFilled } from '@/app/component/FilledButton';
import { useDispatch } from 'react-redux';
import { setModal } from '@/redux/features/modalstates';
import { useRouter } from 'next/navigation';
import ApiCall from '@/app/utils/apicalls/axiosInterceptor';
import { setActiveProperty } from '@/redux/features/propertySlice';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';
import { fetchPerformanceFailure, fetchPerformanceStart, fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice';


export const getPerformanceMetrics = async () => {
  const dispatch = useDispatch();
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty)
  if (activeProperty.length > 0) {
    dispatch(fetchPerformanceStart())
    try {
      const res = await ApiCall.get('/crawl/overall', {
        params: {
          url: activeProperty,
          type: 'passive',
          limit: 10
        }
      });
      // setPerformanceMetric(res.data)
      dispatch(fetchPerformanceSuccess(res?.data))
      // console.log('Performance metrics:', res.data);
    } catch (error) {
      dispatch(fetchPerformanceFailure(`Failed to fetch performance metric, Error: ${error}`))
      console.error('Error fetching performance metrics:', error);
    }
  }
  console.log("ACTIVE PROP", activeProperty)
};
export default function AddProject() {
  const [err, setErr] = useState({ status: false, msg: '' });
  const [loading, setLoading] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const activeProperty = useSelector((state: RootState) => state.property.activeProperty)

  const getPerformanceMetrics = async () => {
    const dispatch = useDispatch();
    if (activeProperty.length > 0) {
      dispatch(fetchPerformanceStart())
      try {
        const res = await ApiCall.get('/crawl/overall', {
          params: {
            url: activeProperty,
            type: 'passive',
            limit: 10
          }
        });
        // setPerformanceMetric(res.data)
        dispatch(fetchPerformanceSuccess(res?.data))
        // console.log('Performance metrics:', res.data);
      } catch (error) {
        dispatch(fetchPerformanceFailure(`Failed to fetch performance metric, Error: ${error}`))
        console.error('Error fetching performance metrics:', error);
      }
    }
    console.log("ACTIVE PROP", activeProperty)
  };


  async function handleSubmitUrl() {
    const urlPattern = /^(ftp|http[s]?):\/\/[^ "]+(\.[^ "]+)+$/
    if (!urlPattern.test(inputUrl)) {
      setErr({ status: true, msg: 'Enter a valid url' })
      setLoading(false)
      setTimeout(() => {
        setLoading(false)
        setErr({ status: false, msg: '' })
      }, 5000)
      return
    }
    try {
      setLoading(true)

      const addPropert = await ApiCall.get(`crawl/add-property?url=${inputUrl}`)
        .then(() => dispatch(setModal('')))
        .then(() => dispatch(setActiveProperty(inputUrl)))
        .then(() => setLoading(false))
      const crawlUrl = await ApiCall.get('/crawl/overall', {
        params: {
          url: activeProperty,
          type: 'passive',
          limit: 10
        }
      })
    } catch (error: any) {
      console.log("ERR", error)
      setErr({ status: true, msg: error.response.data.message });
      if (error.status === 401) {
        router.push('/login')
      }
      setLoading(false)
      setTimeout(() => {
        setErr({ status: false, msg: '' });
      }, 5000);
      return false;

    }
    setLoading(false)
  }


  const cancel = () => dispatch(setModal(''));

  return (
    <section className='flex flex-col space-y-3 justify-center w-full items-center'>
      <Image src='/home/addprojecticon.png' height={48} width={48} alt='icon ' />
      <h3 className=' font-semibold text-lg text-[#101828]'> Add project</h3>
      <p className=' text-sm font-normal text-[#475467]'> Please enter your project domain name.</p>

      <div className="flex flex-col justify-start w-full">
        <label className='text-sm text-[#344054] font-medium ' > Domain name</label>
        <input type="text" placeholder='e.g. domain.com' className='p-2 rounded-md w-full border' value={inputUrl} onChange={(e) => setInputUrl(e.target.value)} />
        {err.status && <small className='text-red-500'>{err.msg} </small>}
      </div>
      <div className="flex items-center justify-between gap-4 w-full">
        <PlainButton title='Cancel' handleClick={cancel} />
        <ButtonFilled title='Add' loading={loading} handleClick={handleSubmitUrl} />
      </div>
    </section>
  );
}
