import React, { createContext, useContext, useEffect, createRef, useState } from "react";
import { createPortal } from "react-dom";
import { useForm } from 'react-hook-form';
import './modal.css';
import { IoPersonAddOutline, IoPersonRemoveOutline } from 'react-icons/io5'


//create modal context to allow any component to use onCloseModal function
//modal can be closed with escape key as well as buttons
const modalContext = createContext();

export default function Modal({ children, onModalClose }) {
  useEffect(() => {
    function keyListener(e) {
      //get listener of key pressed
      const listener = keyListenersMap.get(e.keyCode);
      //call listener if it exists
      return listener && listener(e);
    }
    document.addEventListener("keydown", keyListener);

    return () => document.removeEventListener("keydown", keyListener);
  });

  const modalRef = createRef();

  //pressing tab or shift + tab allows user to navigate within the modal
  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'button, input[type="text"], input[type="select"], input[type="submit"], input[type="date"], input[type="email"], input[type="tel"]'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };
 
  //keyboard listeners, ESCAPE KEY, and TAB KEY
  const keyListenersMap = new Map([[27, onModalClose], [9, handleTabKey]]);


  //allows render of modal directly in the body of document
  return createPortal(
    <div className="modal-container" role="dialog" aria-modal="true">
      <div className="modal-content" ref={modalRef}>
        <modalContext.Provider value={{ onModalClose }}>
          {children}
        </modalContext.Provider>
      </div>
    </div>,
    document.body
  );
}

//modal header component
Modal.Header = function ModalHeader(props) {
  const { onModalClose } = useContext(modalContext);

  return (
    <div className="modal-header">
      {props.children}
      <button className="cross-btn" title="close modal" onClick={onModalClose}>
      &times;
      </button>
    </div>
  );
};

//modal body component
Modal.Body = function ModalBody(props) {

  //function for setting count of reservation party using buttons
  const [count, setCount] = useState(2);  

  function increment() {
    setCount(function (prevCount) {
      return (prevCount += 1);
    });
  };

  function decrement() {
    setCount(function (prevCount) {
      if (prevCount > 1) {
        return (prevCount -= 1); 
      } else {
        return (prevCount = 1);
      }
    });
  };

//react-hook-form
const { handleSubmit, register, formState: { errors } } = useForm();
const onSubmit = (data) => {
  console.log(data);
  alert(JSON.stringify(data))
}
  return <div className="modal-body">{props.children}
            <form className="reserve-form" id="hook-form" onSubmit={handleSubmit(onSubmit)}>
                <input 
                  className="form-control"
                  type="text"
                  placeholder="First Name"
                  name="FirstName"
                  {...register("FirstName", {
                    required: true
                  })}
                />
                {errors.FirstName?.type === "required" && <span className="required">First name is required</span>}
                <input
                  className="form-control"
                  type="tel"
                  placeholder="Phone Number"
                  name="PhoneNumber"
                  {...register("PhoneNumber", {
                    required: true
                  })} 
                />
                {errors.PhoneNumber?.type === "required" && <span className="required">Phone number is required</span>}       
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  name="Email"
                  {...register("Email", {
                    required: true
                  })}
                />
                {errors.Email?.type === "required" && <span className="required">Email is required</span>}        
                
                  <span className="date-time">Date
                  <input
                    className="date-control"
                    type="date"
                    name="Date"
                    {...register("Date", {
                      required: true
                    })}
                  /> 
                </span>
                <span className="date-time">Time
                  <select 
                    className="select-time"
                    name="Time"
                    type="time"
                    {...register("Time", {
                      required: true
                    })}
                  >
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="11:15 AM">11:15 AM</option>
                    <option value="11:30 AM">11:30 AM</option>
                    <option value="11:45 AM">11:45 AM</option>
 
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="12:15 PM">12:15 PM</option>
                    <option value="12:30 PM">12:30 PM</option>
                    <option value="12:45 PM">12:45 PM</option>
 
                    <option value="1:00 PM">1:00 PM</option>
                    <option value="1:15 PM">1:15 PM</option>
                    <option value="1:30 PM">1:30 PM</option>
                    <option value="1:45 PM">1:45 PM</option>
                            
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="2:15 PM">2:15 PM</option>
                    <option value="2:30 PM">2:30 PM</option>
                    <option value="2:45 PM">2:45 PM</option>
                            
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="3:15 PM">3:15 PM</option>
                    <option value="3:30 PM">3:30 PM</option>
                    <option value="3:45 PM">3:45 PM</option>
                            
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="4:15 PM">4:15 PM</option>
                    <option value="4:30 PM">4:30 PM</option>
                    <option value="4:45 PM">4:45 PM</option>
                            
                    <option value="5:00 PM">5:00 PM</option>
                    <option value="5:15 PM">5:15 PM</option>
                    <option value="5:30 PM">5:30 PM</option>
                    <option value="5:45 PM">5:45 PM</option>
                            
                    <option value="6:00 PM">6:00 PM</option>
                    <option value="6:15 PM">6:15 PM</option>
                    <option value="6:30 PM">6:30 PM</option>
                    <option value="6:45 PM">6:45 PM</option>
                            
                    <option value="7:00 PM">7:00 PM</option>
                    <option value="7:15 PM">7:15 PM</option>
                    <option value="7:30 PM">7:30 PM</option>
                    <option value="7:45 PM">7:45 PM</option>
                            
                    <option value="8:00 PM">8:00 PM</option>
                    <option value="8:15 PM">8:15 PM</option>
                    <option value="8:30 PM">8:30 PM</option>
                    <option value="8:45 PM">8:45 PM</option>
                  </select>
                </span>
              </form>
                <div className="reserve-people">
                    <button className="decrease" onClick={decrement}><IoPersonRemoveOutline></IoPersonRemoveOutline></button>
                      <span className="count" name="count"> {`${count}`}</span>
                    <button className="increase" onClick={increment}><IoPersonAddOutline></IoPersonAddOutline></button>
                </div>
                <Modal.Footer>
                <Modal.Footer.SubmitBtn>Submit</Modal.Footer.SubmitBtn>
                <Modal.Footer.CloseBtn>Cancel</Modal.Footer.CloseBtn>
                </Modal.Footer>
         </div>;
};

//modal footer component
Modal.Footer = function ModalFooter(props) {
  return <div className="modal-footer">{props.children}</div>;
};

Modal.Footer.SubmitBtn = function SubmitBtn(props) {
  return (
    <button 
      {...props}
      className="submit-btn"
      type="submit" 
      form="hook-form">
    </button>
  );
};

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onModalClose } = useContext(modalContext);
  return (
    <button
      {...props}
      className="close-btn"
      title="close modal"
      onClick={onModalClose}
    />
  );
};
