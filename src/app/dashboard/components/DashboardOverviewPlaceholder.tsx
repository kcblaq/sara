"use client"
import FilledButton from '@/app/component/FilledButton'
import { removeTrailingSlash } from '@/app/utils/RemoveSlash';
import ApiCall from '@/app/utils/apicalls/axiosInterceptor';
import { setModal } from '@/redux/features/modalstates';
// import { fetchPerformanceSuccess } from '@/redux/features/performanceMetric slice';
import { setActiveProperty } from '@/redux/features/propertySlice';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function DashboardOverviewPlaceholder() {

  const [err, setErr] = useState({ status: false, msg: '' });
  const [loading, setLoading] = useState(false)
  const [inputUrl, setInputUrl] = useState('')
  const dispatch = useDispatch();
  const router = useRouter();

  async function handleSubmitUrl() {
    const urlPattern = /^(ftp|http[s]?):\/\/[^ "]+(\.[^ "]+)+$/;
    if (!urlPattern.test(inputUrl)) {
        setErr({ status: true, msg: 'Enter a valid URL' });
        setTimeout(() => {
            setErr({ status: false, msg: '' });
        }, 5000);
        return;
    }

    try {
        setLoading(true);
         await ApiCall.get(`crawl/add-property?url=${inputUrl}`);
        dispatch(setActiveProperty(inputUrl));

        await Promise.all([
            dispatch(setModal('crawling')),
            setLoading(true),
            ApiCall.get('/crawl/overall', {
                params: {
                    url: removeTrailingSlash(inputUrl),
                    type: 'passive',
                    limit: 10
                }
            }),
            ApiCall.get('/crawl/technical/mini-crawler', {
                params: {
                    url: inputUrl,
                    timeout: 5
                }
            })
        ]);
        dispatch(setModal(''));
        
        setLoading(false)
    } catch (error:any) {
        console.error("Error:", error);
        const errorMessage = error.response ? error.response.data.message : 'An error occurred';
        setErr({ status: true, msg: errorMessage });
        if (error.response && error.response.status === 401) {
            router.push('/login');
        }
    } finally {
        setLoading(false);
    }
}


  return (
    <div className='h-full w-full flex-col gap-6 items-start flex justify-start px-[95px] pt-[143px]'>
        <div className='flex flex-col gap-4'>

        <h1 className='text-[#101828] font-semibold text-4xl'>Track, manage and boost your site’s SEO.</h1>
        <p className='text-xl font-medium'>Add your site domain to start your SEO journey now!</p>
        </div>
        <div className="flex flex-col w-full">
          <label className=''>
          Enter your domain 
          </label>
          <div className='flex gap-4 items-center'>
          <input className='p-2 min-w-[620px] border rounded-md ' placeholder='e.g domain.com' onChange={(e)=> setInputUrl(e.target.value)} />
         <div >
         <FilledButton loading={loading} title={loading ? 'Crawling... ' : "Let's go"} handleClick={handleSubmitUrl} />
         </div>
          </div>
        </div>
    </div>
  )
}
