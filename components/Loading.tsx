import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";

interface Props {}

const Loading: React.FC<Props> = () => {
  const elementottie = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: elementottie.current as HTMLDivElement,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("../public/images/squirtle.json"),
    });
  }, [elementottie]);
  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div
          className="elementottie h-60 w-60 items-center justify-center text-center"
          ref={elementottie}
        ></div>
        <h1>Loading...</h1>
      </div>
    </>
  );
};

export default Loading;

/**
 * Wrap any Lottie animations you want the effect to apply to with a div tag with
 * the class "hoverEffects" and the code below should handle playing on hover and
 * playing in reverse on mouse leave.
 */
