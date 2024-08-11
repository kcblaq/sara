"use client";
import React from "react";
import TitleAndDescription from "../../../component/TitleAndDescription";
import FilledButton from "@/app/component/FilledButton";
import { useRouter } from "next/navigation";

export default function ResetPasswordSuccess() {
  const route = useRouter();
  return (
    <div className="grid gap-4 ">
      <TitleAndDescription
        title="Password reset"
        description={
          <>
            Your password has been reset successfully. <br /> Click below to log
            into your dashboard.
          </>
        }
      />
      <FilledButton title="Continue" handleClick={() => route.push("/login")} />
    </div>
  );
}
