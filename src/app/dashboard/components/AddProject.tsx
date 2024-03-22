import { useRef, useState } from 'react';
import Image from 'next/image';
import PlainButton from '@/app/component/PlainButton';
import { ButtonFilled } from '@/app/component/FilledButton';
import { useDispatch } from 'react-redux';
import { setModal } from '@/redux/features/modalstates';
import { AxiosInstance } from '@/lib/axios';

export default function AddProject() {
    const [err, setErr] = useState(false);
    const dispatch = useDispatch();
    const inputRef = useRef<HTMLInputElement>(null)

    async function handleSubmitUrl() {
        const url = inputRef.current?.value ?? '';
        const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
        try {
            if(!urlPattern.test(url)) {
                setErr(true)
                setTimeout(()=> {
                    setErr(false)
                }, 5000)
                return
            } else {
               await AxiosInstance.get(`crawl/crawl-guest?url=${url}`)
               .then((res) => console.log(res))
               .then(()=> dispatch(setModal('')))
            }

            
        } catch (error) {
            setErr(true);
            setTimeout(() => {
                setErr(false);
            }, 5000);
            return false;
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
                <input type="text" placeholder='e.g. domain.com' className='p-2 rounded-md w-full border' ref={inputRef} />
                {err && <small className='text-red-500'> Enter a valid url </small>}
            </div>
            <div className="flex items-center justify-between gap-4 w-full">
                <PlainButton title='Cancel' handleClick={cancel} />
                <ButtonFilled title='Add' handleClick={handleSubmitUrl} />
            </div>
        </section>
    );
}
