import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const customStyle = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-30%',
    transform: 'translate(-50%, -50%)',
  },
};

function LogoutModal({ isOpen, logout, stayConnected }) {
  const [timeLeft, setTimeLeft] = useState(5);

  useEffect(() => {
    // exit early when we reach 0
    if (!timeLeft) return;

    // save intervalId to clear the interval when the
    // component re-renders
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    // clear interval on re-render to avoid memory leaks
    return () => clearInterval(intervalId);
    // add timeLeft as a dependency to re-rerun the effect
    // when we update it
  }, [timeLeft]);

  return (
    <Modal isOpen={isOpen} onRequestClose={logout} style={customStyle}>
      <div className='modal-header'>
        <h5 className='modal-title'>Your Session is About to Expire!</h5>{' '}
        <button
          type='button'
          className='btn-close'
          onClick={stayConnected}
        ></button>
      </div>
      <div className='modal-body'>
        <p>Your session is about to expire.</p>
        <p>Signing out in {timeLeft} seconds.</p>
      </div>
      <div className='modal-footer'>
        <button type='button' className='btn btn-secondary' onClick={logout}>
          Logout
        </button>
        <button
          type='button'
          className='btn btn-primary'
          onClick={stayConnected}
        >
          Stay Connected
        </button>
      </div>
    </Modal>
  );
}

export default LogoutModal;
