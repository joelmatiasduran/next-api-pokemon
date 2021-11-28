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

        <div className="elementottietwo h-20 w-60" ref={elementottietwo}></div>
      </div>
    </>
  );
};

export default Loading;
