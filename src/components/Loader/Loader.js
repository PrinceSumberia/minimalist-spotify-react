import React from "react";
import Lootie from "react-lottie";
import * as animationData from "../../assets/loading2.json";
import "./LoaderStyles.scss";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData.default,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function Loader() {
  return (
    <div className="loading">
      <Lootie options={defaultOptions} height={300} width={300} />
    </div>
  );
}

export default Loader;
