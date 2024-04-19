// import React from 'react'
// import './InvalidPopup.css'
// const InvalidPopup = (props) => {
//   return (props.trigger) ? (
//     <div className='popup'>
//       <div className='popup-inner'>
//         <button className='close-btn' onClick={() => props.setTrigger(false)}>close</button>
//         {props.children}
//       </div>
//     </div>
//   ) : "";
// }

// export default InvalidPopup

import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const InvalidPopup = ({ show, handleClose, title, children }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvalidPopup;
