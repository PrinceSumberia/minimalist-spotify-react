import React from 'react';

import Lootie from 'react-lottie';

import loadingData from '../../assets/loading2.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: loadingData,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice',
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
