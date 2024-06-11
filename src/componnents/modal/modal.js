import React, { useEffect, useState } from 'react';
import './modal.scss';

const ErrorModal = ({ show, status, errorMessage, handleClose }) => {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (show) {
      setFade(true);
    } else {
      setFade(false);
    }
  }, [show]);

  return (
    <div className={`modal ${fade ? 'fade-in' : 'fade-out'}`} id='Modal'>
      <div className='modal-inner'>
        <h2>{status}</h2>
        <hr />
        <p>{errorMessage}</p>
        <button onClick={handleClose} id='closeModal'>Close</button>
      </div>
    </div>
  );
};

export default ErrorModal;

