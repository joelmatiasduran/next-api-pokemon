import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { UserProvider } from "@auth0/nextjs-auth0";
import "tailwindcss/tailwind.css";
import "../styles/base.css";
import Loading from "../components/Loading";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);
  return (
    <UserProvider>
      {pageLoading ? <Loading /> : <Component {...pageProps} />}
    </UserProvider>
  );
}

export default MyApp;
