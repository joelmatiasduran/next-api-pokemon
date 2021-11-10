import React, { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

interface Props {
  children: ReactElement;
  title?: string;
}

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Head>
        <title>Next Pokemon</title>
      </Head>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
