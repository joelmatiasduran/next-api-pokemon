import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import { UserProvider } from "@auth0/nextjs-auth0";
import "tailwindcss/tailwind.css";
import "../styles/base.css";
import { title } from "process";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserProvider>
      <Layout title={title}>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}

export default MyApp;
