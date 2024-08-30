"use client";
import FilledButton from "@/app/component/FilledButton";
import TitleAndDescription from "@/app/component/TitleAndDescription";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function page() {
  const [status, setStatus] = useState("idle");
  const route = useRouter();

  const handleContinue = () => {
    setStatus("loading");
    route.push("/dashboard");
  };
  return (
    <div className="flex flex-col gap-4 min-[425px]:min-w-[400px] w-full">
      <TitleAndDescription
        title="Email verified"
        description={
          <>
            Your Email has been verify successfully. <br /> Click below to log
            into your dashboard.
          </>
        }
      />
      <Link href={"/dashboard"}>
        <FilledButton
          disabled={status === "loading"}
          loading={status === "loading"}
          title="Continue"
          handleClick={handleContinue}
        />
      </Link>
    </div>
  );
}
