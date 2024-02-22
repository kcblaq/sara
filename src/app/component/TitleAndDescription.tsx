
type Props = {
    title: string;
    description: string | React.ReactNode;
}
export default function TitleAndDescription({title, description}: Props){
    return(
        <div className="flex flex-col items-center gap-2">
            <h1 className=" font-bold text-3xl">{title} </h1>
            <p className=" text-center"> {description} </p>
        </div>
    )
}