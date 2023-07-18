import React, { useState, useContext } from "react";
import "../Css/Signin.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Redux/action";
// import { LoginContext } from '../Context/loginContext'

const SignIn = () => {
  // const {setUserLogin}= useContext(LoginContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const x = useSelector((Store) => Store);

  const alertError = (msg) => toast.error(msg);
  const alertSuccess = (msg) => toast.success(msg);

  let rejexEmail = "[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$"; // checking for correct email id

  const postData = () => {
    // checking email
    let resp = email.match(rejexEmail);
    if (!resp) {
      return alertError("Invalid email id"); // return krne se aage ka code nhi chlega agar if statement true hoga to
    }

    setLoading(true);
    fetch(`https://buyc-corp-ts7x.onrender.com/user/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alertError(data.err);
          setLoading(false);
          dispatch(login(false));
        } else {
          alertSuccess("Signed In Successfully...!");
          console.log(data.user);
          localStorage.setItem("Buycartoken", data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setLoading(false);
          dispatch(login(true));

          navigate("/");
        }
        console.log("login", x.loginReducer.loginStatus);
        console.log(data);
      });
  };
  if (loading) {
    return (
      <div className="loader">
        <div id="wifi-loader">
          <svg className="circle-outer" viewBox="0 0 86 86">
            <circle className="back" cx="43" cy="43" r="40"></circle>
            <circle className="front" cx="43" cy="43" r="40"></circle>
            <circle className="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg className="circle-middle" viewBox="0 0 60 60">
            <circle className="back" cx="30" cy="30" r="27"></circle>
            <circle className="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg className="circle-inner" viewBox="0 0 34 34">
            <circle className="back" cx="17" cy="17" r="14"></circle>
            <circle className="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div className="text" data-text="Signing In"></div>
        </div>
      </div>
    );
  }
  return (
    <div className="SignIn">
      <div>
        <div className="loginForm">
          <img className="signInLogo" src="" alt="" />
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Sign In"
            id="login-btn"
            onClick={() => postData()}
          />
        </div>

        <div className="loginForm2">
          Dont Have an account ?{" "}
          <Link to="/signup">
            <span
              style={{
                color: "tomato",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Sign Up
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
