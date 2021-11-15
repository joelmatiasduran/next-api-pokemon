import React, { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

interface Props {
  children?: React.ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <Navbar user={""} />
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
