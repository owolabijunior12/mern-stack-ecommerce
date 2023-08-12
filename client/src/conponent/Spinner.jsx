import React from 'react';
import {Vortex} from 'react-loader-spinner';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
     <Vortex
  visible={true}
  height="50"
  width="50"
  ariaLabel="vortex-loading"
  wrapperStyle={{}}
  wrapperClass="vortex-wrapper"
  colors={['black', 'gray', 'gold', 'black', 'orange', 'purple']}
/>

      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;