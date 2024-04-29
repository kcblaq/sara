
interface Props {
    date: string;
}
export default function LastUpdated({date}: Props) {
  return (
    <div className='flex items-center gap-3 text-lg'>
    <p className={` font-semibold text-[#000000] text-base `}>Last updated: </p>
    <p className='font-normal text-[#000000]'> {date} </p>
  </div>
  )
}
