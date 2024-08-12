"use client";
import FilledButton from "@/app/component/FilledButton";
import TitleAndDescription from "@/app/component/TitleAndDescription";
import { useEffect, useState } from "react";
import BackToLogin from "../../password/BackToLogin";
import { useRouter } from "next/navigation";

export default function page() {
  const [email, setEmail] = useState("");
  const navigate = useRouter();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    setEmail(userEmail ?? "");
  }, []);

  return (
    <main className="w-full flex flex-col justify-center items-center gap-4 sm:w-auto sm:min-w-[400px]">
      <TitleAndDescription
        title="Check your email"
        description={`We sent a verification code to ${email}`}
      />
      <div className="my-4 w-full">
        <FilledButton
          title="Enter code"
          handleClick={() => navigate.push("/signup/email-verify/otp")}
        />
      </div>

      <BackToLogin />
    </main>
  );
}
