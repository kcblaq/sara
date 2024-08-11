"use client";
import PasswordInputComponent from "@/app/component/PasswordInputComponent";
import TitleAndDescription from "../../../component/TitleAndDescription";
import { Suspense, useEffect, useState } from "react";
import FilledButton from "@/app/component/FilledButton";
import BackToLogin from "../BackToLogin";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, _setSuccess] = useState(false);
  const [error, setError] = useState({ message: "", status: false });

  const router = useRouter();
  const params = new URLSearchParams();

  const link = params.get("link");
  const email = params.get("email");

  async function ConfirmLink() {
    try {
      const res = await axios.get("https://api.webmaxi.com/api/auth/password", {
        params: {
          link,
          email,
        },
      });

      if (res.status === 200 || res.status === 201) {
        // Process successful response
        console.log("Success:", res.data);
      } else {
        // Handle unexpected status codes
        setError({
          status: true,
          message: "This link is expired, try to generate another link",
        });
        setTimeout(() => {
          router.push("/password");
          setError({ status: false, message: "" });
        }, 7000);
      }
    } catch (error: any) {
      // Handle network error or other exceptions
      console.error("Error:", error.message);
    }
  }

  async function SubmitNewPassword() {
    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.webmaxi.net/api/auth/reset-password",
        {
          email,
          newPassword: confirmPassword,
        }
      );
      // Check response status or data to determine success or failure
      console.log("Password changed successfully:", response.data);
    } catch (error: any) {
      console.error("Error changing password:", error.message);
      // Handle error, display error message to user, etc.
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    ConfirmLink();
  }, []);

  return (
    <Suspense fallback={<div> Loading...</div>}>
      <main className="w-full flex flex-col justify-center items-center gap-4 max-w-[400px]">
        {error.status && <div className="text-red-500"> {error.message} </div>}
        {!error.status && (
          <TitleAndDescription
            title="Set new password"
            description="Your new password must be different from previously used password."
          />
        )}
        {success && (
          <p className="text-green-500 text-2xl">
            {" "}
            Password successfully changed{" "}
          </p>
        )}
        <main className="w-full flex flex-col gap-4">
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">Password</label>
            <PasswordInputComponent
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold text-gray-700">
              Confirm password
            </label>
            <PasswordInputComponent
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <p className="text-gray-600 mt-2">
              {" "}
              Must be at least 8 characters{" "}
            </p>
          </div>
          <FilledButton
            loading={loading}
            title="Reset password"
            handleClick={SubmitNewPassword}
          />
          <BackToLogin />
        </main>
      </main>
    </Suspense>
  );
}
