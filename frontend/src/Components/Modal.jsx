import React, { useContext } from "react";
import { RiCloseLine } from "react-icons/ri";
import "../Css/Modal.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, setModalOpen } from "../Redux/action";

const Modal = () => {
  const dispatch = useDispatch();
  const allState = useSelector((Store) => Store);
  const navigate = useNavigate();
  return (
    <div className="darkBg" onClick={() => dispatch(setModalOpen(false))}>
      <div className="centered">
        <div className="modal">
          {/* modal header */}
          <div className="modalHeader">
            <h5 className="heading">Confirm</h5>
          </div>
          <button
            className="closeBtn"
            onClick={() => dispatch(setModalOpen(false))}
          >
            {/* icon */}
            <RiCloseLine></RiCloseLine>
          </button>
          {/* modal content */}
          <div className="modalContent">Log out ?</div>
          <div className="modalActions">
            <div className="actionsContainer">
              <button
                className="logOutBtn"
                onClick={() => {
                  dispatch(setModalOpen(false));
                  dispatch(login(false));
                  localStorage.clear();
                  navigate("/signin");
                }}
              >
                Log Out
              </button>
              <button
                className="cancelBtn"
                onClick={() => dispatch(setModalOpen(false))}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
