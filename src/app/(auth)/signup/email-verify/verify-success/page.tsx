import FilledButton from "@/app/component/FilledButton";
import TitleAndDescription from "@/app/component/TitleAndDescription";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function page() {
  // const route = useRouter();
  return (
    <div className="flex flex-col gap-4 min-[425px]:min-w-[400px]  w-full">
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
          title="Continue"
          // handleClick={() => route.push("/dashboard")}
        />
      </Link>
    </div>
  );
}
