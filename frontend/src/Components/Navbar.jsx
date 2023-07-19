import React from "react";
import "../Css/Navbar.css";
import { useDisclosure } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setModalOpen } from "../Redux/action";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const allState = useSelector((Store) => Store);
  console.log("allState", allState);

  const loginStatus = () => {
    const token = localStorage.getItem("Buycartoken");
    let userName = JSON.parse(localStorage.getItem("user"));
    let name;
    if (userName) {
      name = userName.name;
      name = name.replace(/['"]+/g, "");
    }
    if (allState.loginReducer.loginStatus || token) {
      console.log("allState2", allState);
      return [
        <>
          <Link to="/">
            {" "}
            <li>Home</li>
          </Link>

          <Link style={{ marginLeft: "20px" }} to="/sellyourcar">
            {" "}
            <li>Sell Your Car </li>
          </Link>
          <Link style={{ marginLeft: "20px" }} to="/yourpost">
            {" "}
            <li>Your Post </li>
          </Link>
          <Link to={""}>
            <button
              onClick={() => dispatch(setModalOpen(true))}
              className="primaryBtn"
            >
              Log out
            </button>
            <button className="primaryBtn" disabled>
              {name}
            </button>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            {" "}
            <li>Signup</li>{" "}
          </Link>

          <Link to="/signin">
            {" "}
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };

  const loginStatusMobile = () => {
    const token = localStorage.getItem("Buycartoken");
    if (allState.loginReducer.loginStatus || token) {
      return [
        <>
          <Link to="/">
            {" "}
            <li>
              <span class="material-symbols-outlined">home</span>
            </li>
          </Link>

          <Link to="/sellyourcar">
            {" "}
            <li>
              <span class="material-symbols-outlined">add_box</span>
            </li>
          </Link>

          <Link to="/yourpost">
            {" "}
            <li>
              <span class="material-symbols-outlined">account_circle</span>
            </li>
          </Link>

          <Link to={""}>
            <li className="primaryBtn">
              <span class="material-symbols-outlined">logout</span>
            </li>
          </Link>
        </>,
      ];
    } else {
      return [
        <>
          <Link to="/signup">
            {" "}
            <li>Signup</li>{" "}
          </Link>

          <Link to="/signin">
            {" "}
            <li>SignIn</li>
          </Link>
        </>,
      ];
    }
  };
  return (
    <>
      <div className="navbar">
        <h1
          onClick={() => navigate("/")}
          style={{
            cursor: "pointer",
            width: "5%",
            fontFamily: "fantasy",
            padding: "0.5%",
          }}
        >
          BuyCar
        </h1>

        <ul className="nav-menu">{loginStatus()}</ul>
        <ul className="nav-mobile">{loginStatusMobile()}</ul>
      </div>
    </>
  );
};

export default Navbar;
