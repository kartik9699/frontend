import React from 'react'
import reactDom from 'react-dom'
const MODAL_STYLES={
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1000,
    height:'90%',
    width:'90%'
}
const OVERLAY_STYLES={
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    zIndex: 1000
    }
function Modal({children,onClose}) {
 
  return reactDom.createPortal(
    <>
      <div style={OVERLAY_STYLES} />
      <div style={MODAL_STYLES}>
        <button className='btn bg-danger fs4' style={{marginLeft:"90%",marginTop:"-35px"}} onClick={onClose}>X</button>
        {children}
        </div>
    </>,
    document.getElementById('cart-root')
  )
}

export default Modal
