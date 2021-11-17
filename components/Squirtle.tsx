import React, { useEffect, useRef, useState } from "react";
import lottie from "lottie-web";
import { motion } from "framer-motion";

interface Props {}

const Loading: React.FC<Props> = () => {
  const elementottie = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState<null | boolean>(false);
  useEffect(() => {
    lottie.loadAnimation({
      container: elementottie.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: false,
      animationData: require("../public/images/squirtle.json"),
    });
    return () => {
      lottie.destroy();
    };
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          className="elementottie h-60 w-60 items-center justify-center text-center cursor-pointer"
          ref={elementottie}
          onMouseEnter={() => lottie.play()}
          onMouseLeave={() => lottie.pause()}
        ></div>
      </div>
    </>
  );
};

export default Loading;
