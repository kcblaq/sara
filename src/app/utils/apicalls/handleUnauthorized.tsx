import { useRouter } from "next/router";

export const handleUnauthorized = () => {
    const router = useRouter();
    router.push("/login");
  };