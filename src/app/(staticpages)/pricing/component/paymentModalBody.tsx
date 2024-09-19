import { IoMdArrowBack, IoIosClose } from "react-icons/io"

type Props = {
    closeModal: ()=> void;
}
export const PaymentModalBody = ({closeModal}:Props) => {
    return (
        <>
            <main className="grid justify-between items-start w-full p-4 min-h-[100px]">
                <div className="flex items-center justify-between w-full">
                    <IoMdArrowBack className="hover:bg-gray-300" onClick={closeModal}/>
                    <IoIosClose className="hover:bg-gray-300" onClick={closeModal}/>

                </div>
                
            </main>
        </>
    )
}