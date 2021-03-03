import React from 'react';

function Loader() {
  return (
    <div className='loader'>
      <div className='d-flex justify-content-center'>
        <div className='spinner-border text-secondary' role='status'></div>
      </div>
    </div>
  );
}

export default Loader;
