import React, { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import lottie from "lottie-web";
import Link from "next/link";
import Head from "next/head";
import Layout from "../components/Layout";
import { motion } from "framer-motion";

interface Props {
  user: String;
}

const LoginPage: React.FC<Props> = () => {
  const router = useRouter();
  const { user } = useUser();
  const elementottie = useRef<HTMLDivElement>(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: elementottie.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/images/squirtle.json"),
    });

    if (user) {
      router.push("/homepage");
    }
    return () => {
      lottie.destroy();
    };
  }, [router, user]);

  return (
    <>
      <Layout title="Login | Next.js">
        <section className="h-full w-full text-black bg-yellow-300">
          <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
            <div className="flex items-center justify-center flex-col text-center lg:w-2/3 w-full">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium	 text-black font-mono">
                Welcome to the Pokemon API.{" "}
              </h1>
              <motion.div
                drag
                dragConstraints={{
                  top: -370,
                  left: -500,
                  right: 500,
                  bottom: 370,
                }}
              >
                <div
                  className="elementottie h-60 w-60 items-center justify-center text-center cursor-move"
                  ref={elementottie}
                ></div>
              </motion.div>
              {!user && (
                <p className="leading-relaxed mb-8 font-normal">
                  Please Login to get access to the Pokemon API, and see all of
                  them in just one place
                </p>
              )}
              {user && (
                <>
                  <h1>Amazing!! Now you can access all the content!!</h1>
                </>
              )}
              <div className="flex justify-center mt-10">
                <motion.button
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0px 0px 40px #ff0000 ",
                  }}
                  whileTap={{ scale: 0.9 }}
                  className="border-2 border-red-600  text-white rounded-full font-bold py-4 px-6 mr-2 flex items-center bg-red-600 hover:bg-black hover:text-white"
                >
                  {!user && (
                    <Link href="/api/auth/login">
                      <a className="flex flex-row">
                        Login
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="hover:animate-spin ml-4 h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </a>
                    </Link>
                  )}
                  {user && <h2>Loading...</h2>}
                </motion.button>
                {user && (
                  <button className="animate-spin">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
};

export default LoginPage;
