import { useState } from 'react';
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
// import { GetPassiveAndDeepFetch } from '@/app/utils/apicalls/fetches/GetPassiveAndDeepFetchData';
import { FetchTechnicalSeo } from '../technical-seo/components/FetchTechnicalSeo';
import { removeTrailingSlash } from '@/app/utils/RemoveSlash';
import { setLoading } from '@/redux/features/loaderSlice';


export const getPerformanceMetrics = async () => {
  const dispatch = useDispatch();
  const activeProperty = useSelector((state: RootState) => state.property.activeProperty)
  if (activeProperty.length > 0) {
    dispatch(fetchPerformanceStart())
    try {
      const res = await ApiCall.get('/crawl/technical-seo', {
        params: {
          url: activeProperty,
          limit: 100,
          platform: 'desktop'
        }
      });
      // setPerformanceMetric(res.data)
      dispatch(fetchPerformanceSuccess(res?.data))
      
    } catch (error) {
      dispatch(fetchPerformanceFailure(`Failed to fetch performance metric, Error: ${error}`))
      console.error('Error fetching performance metrics:', error);
    } finally {
      FetchTechnicalSeo()
    }
  }
  // console.log("ACTIVE PROP", activeProperty)
};


export default function AddProject() {
  const [err, setErr] = useState({ status: false, msg: '' });
  const [isloading, setisLoading] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const dispatch = useDispatch();
  // const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  const activeProperty = useSelector((state: RootState) => state.property.activeProperty);




  // const getPerformanceMetrics = async () => {
  //   const dispatch = useDispatch();
  //   if (activeProperty.length > 0) {
  //     dispatch(fetchPerformanceStart())
  //     try {
  //       const res = await ApiCall.get('/crawl/overall', {
  //         params: {
  //           url: activeProperty,
  //           type: 'passive',
  //           limit: 10
  //         }
  //       });
  //       dispatch(fetchPerformanceSuccess(res?.data))
  //     } catch (error) {
  //       dispatch(fetchPerformanceFailure(`Failed to fetch performance metric, Error: ${error}`))
  //       console.error('Error fetching performance metrics:', error);
  //     }
  //   }
  //   console.log("ACTIVE PROP", activeProperty)
  // };
  




  async function handleSubmitUrl() {
    const urlPattern = /^(ftp|http[s]?):\/\/[^ "]+(\.[^ "]+)+$/
    if (!urlPattern.test(inputUrl)) {
      setErr({ status: true, msg: 'Enter a valid url' })
      setisLoading(false)
      setTimeout(() => {
        setisLoading(false)
        setErr({ status: false, msg: '' })
      }, 5000)
      return
    }
    try {
      setisLoading(true)
      dispatch(setLoading(true))
      const response =  await ApiCall.get(`crawl/add-property?url=${inputUrl}`);
      dispatch(setActiveProperty(inputUrl));
      dispatch(setModal('crawling'));
      // setLoading(false);
      await Promise.all([
        ApiCall.get('/crawl/webcrawler', {
          params: {
            url: removeTrailingSlash(inputUrl),
            type: 'passive',
          }
        }),
        ApiCall.get('/crawl/technical/mini-crawler', {
          params: {
              url: removeTrailingSlash(inputUrl),
              timeout: 7,
          }
      }),
        ApiCall.get('/crawl/content-analysis/mini-crawler', {
          params: {
              url: removeTrailingSlash(inputUrl),
          }
      })
      ])
        
      dispatch(setModal(''))
    } catch (error: any) {
      setErr({ status: true, msg: error.response.data.message });
      if (error.status === 401) {
        router.push('/login')
      }
      setisLoading(false)
      setTimeout(() => {
        setErr({ status: false, msg: '' });
      }, 5000);
      return false;

    } finally {

      setLoading(false)
    }
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
        <ButtonFilled title='Add' loading={isloading} handleClick={handleSubmitUrl} />
      </div>
    </section>
  );
}
