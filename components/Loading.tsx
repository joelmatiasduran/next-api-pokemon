import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import LottieLoading from "./LottieLoading";

interface Props {}

const Loading: React.FC<Props> = () => {
  const elementottie = useRef<HTMLDivElement>(null);
  const elementottietwo = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: elementottie.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/images/squirtle.json"),
    });
    lottie.loadAnimation({
      container: elementottie.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/images/lottie-loading.json"),
    });
  }, [elementottie, elementottietwo]);
  return (
    <>
      <div className="flex flex-col items-center justify-center bg-red-500 flex-1 h-full w-full min-h-screen min-w-full">
        <div
          className="elementottie h-60 w-60 items-center justify-center text-center"
          ref={elementottie}
        ></div>
        <div className="pt-6 flex flex-row items-center justify-center">
          {/* <h1 className="text-white text-3xl">Loading</h1>
          <button className="animate-spin text-white">
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
          </button> */}
          <div
            className="elementottietwo h-60 w-60 items-center justify-center text-center"
            ref={elementottietwo}
          ></div>
        </div>
      </div>
    </>
  );
};

export default Loading;
