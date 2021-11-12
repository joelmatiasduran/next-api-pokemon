import React, { ReactElement } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Head from "next/head";

interface Props {
  children: React.ReactNode;
  title?: string;
}

const Layout: React.FC<Props> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Navbar user={""} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
