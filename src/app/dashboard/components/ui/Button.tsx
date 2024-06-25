import { cn } from "@/lib/utils";
import { ComponentProps } from "react";

export default function Button({
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: string }) {
  return (
    <button
      {...props}
      className={cn(
        "rounded-lg shadow-sm px-4 py-2 disabled:bg-opacity-50 font-semibold disabled:cursor-not-allowed whitespace-nowrap hover:outline outline-purple-100 outline-offset-2 disabled:outline-none focus:outline-none focus-visible:ring-2  focus-visible:ring-offset-2 focus-visible:ring-purple-100 transition-all",
        variant === "primary" && "bg-primary text-white",
        variant === "secondary" &&
          "bg-grey-95 text-black border border-grey-90 outline-grey-90",
        variant === "text" && "bg-white text-purple-100 hover:outline-none shadow-none focus:outline-none focus-visible:ring-0",
        variant === "outlined" && "bg-white border-purple-100 text-purple-100",
        variant === "cancel" && "bg-red-500 text-white",
        props.className
      )}
    />
  );
}
