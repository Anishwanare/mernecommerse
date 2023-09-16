import React from "react";
import ReactDOM from "react-dom"

const ModalStyle = {
    position:"fixed",
    top:"50%",
    left:"50%",
    backgroundColor:"rgb(34,34,34)",
    transform:"translate(-50%,-50%)",
    zIndex:1000,
    height:"90%",
    width:"90%"
}

const OverlayStyle = {
    position:"fixed",
    top:0,
    left:0,
    right:0,
    bottom:0,
    backgroundColor:"rgba(0,0,0,.7)",
    zIndex:1000
}

const Modal = ({children,onClose}) => {
  return ReactDOM.createPortal(
    <>
    <div style={OverlayStyle} onClick={onClose}>
        <div style={ModalStyle}>
            <button className="btn bg-danger fs-4" style={{marginLeft:"90%",marginTop:"-35px"}} onClick={onClose}>X</button>
            {children}
        </div>
    </div>
    </>,
    document.getElementById("cart-root")
  )
};

export default Modal;
