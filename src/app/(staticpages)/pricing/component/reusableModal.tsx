import { IoMdArrowBack, IoIosClose } from "react-icons/io"
import { Transition, Dialog } from "@headlessui/react";
import { Fragment } from "react";
import PaypalIcon from "../../../../../public/pricing/paypall.svg";
import Ticked from "../../../../../public/pricing/ticked.svg";
import Input, { InputAndCountryFlag, SelectCountryInput } from "@/app/component/commons/Input";
import { Button } from "@/components/ui/button";
import { IoLogoPaypal } from "react-icons/io5";

type Props = {
    closeModal: () => void;
    show: boolean;
    ModalBody: React.ComponentType<{ closeModal: () => void }>
}
export const ReusableModal = ({ closeModal, ModalBody, show }: Props) => {
    return (
        <>
            <Transition appear show={show} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
                    <Transition
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/25" />
                    </Transition>

                    <span className="fixed inset-0 overflow-y-auto">
                        <span className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden bg-white p-6 text-left align-middle shadow-xl transition-all">

                                    <ModalBody closeModal={closeModal} />

                                </Dialog.Panel>
                            </Transition>
                        </span>
                    </span>
                </Dialog>
            </Transition>
        </>
    )
}

type PaymentProps = {
    closeModal: () => void;

}

export const PaymentBody = ({ closeModal }: PaymentProps) => {

    return (
        <>
            <div className="grid w-full gap-3">
                <div className="flex items-center justify-between">
                    <button className={`p-2 hover:bg-gray-300 rounded-full`}> <IoMdArrowBack /> </button>
                    <button className={`p-2 hover:bg-gray-300 rounded-full`} onClick={closeModal}> <IoIosClose /> </button>
                </div>
                <div className="flex flex-col gap-2 w-full lg:w-2/3">
                    <div className="text-[#1570EF] font-semibold">
                        Payment
                    </div>
                    <h3 className="text-[#101828] text-xl 3xl:text-3xl font-semibold">
                        Add payment details and complete your purchase
                    </h3>
                </div>
                <section className={`grid grid-cols-1 gap-4 lg:grid-cols-3  w-full pb-8`}>
                    <div className={` col-span-1 lg:col-span-2 w-full`}>
                        <div className="flex rounded-tl-lg rounded-tr-lg border bg-[#EFF8FF] p-2 border-[#84CAFF] items-center justify-between">
                            <div className="flex items-center gap-2 lg:gap-4">
                                <PaypalIcon />
                                <h3 className={`text-[#1849A9]`}> PayPal </h3>
                            </div>
                            <Ticked />
                        </div>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 p-2 rounded-br-lg rounded-bl-lg border border-t-0">
                           <Input isShowLabel labelName="First name"  />
                           <Input isShowLabel labelName="Last name"  />
                           <Input isShowLabel labelName="Address"  />
                           <Input isShowLabel labelName="City"  />
                           <Input isShowLabel labelName="Postal Code"  />
                           <SelectCountryInput isShowLabel labelName="Country"/>
                        </div>
                    </div>
                    <div className={` grid-cols-1 h-52 flex flex-col border rounded-lg gap-2 p-4`}>
                        <div className="flex items-center justify-between w-full">
                            <p className="text-[#475467] font-normal"> Standard price</p>
                            <p className="font-semi-bold"> $200</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <p className="font-normal text-[#475467]"> Discount</p>
                            <p className="font-semi-bold"> -$0</p>
                        </div>
                        <hr/>
                        <div className="flex items-center justify-between w-full">
                            <p className="text-[#475467] font-semibold"> Total</p>
                            <p className=""> $200</p>
                        </div>
                        <Button className="bg-[#FDB022] items-center justify-between hover:bg-[#ead6b0]">
                                <IoLogoPaypal className="text-[#298FC4]" />
                                <span>Purchase with Pay<span className="text-[#298FC4]">Pal</span></span>
                        </Button>
                        
                    </div>
                </section>
            </div>
        </>
    )
}