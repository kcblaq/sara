import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";


export default function BackToLogin() {
    return (
        <main className="flex items-center w-full justify-center">
            <Link href={`/login`} className="flex items-center gap-2">
            <FaArrowLeft />
            Back to login
        </Link>
        </main>
    )
}