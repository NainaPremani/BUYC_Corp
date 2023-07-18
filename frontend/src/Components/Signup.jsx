import React, { useEffect, useState } from "react";
import "../Css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setmobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Toast Function
  const alertError = (msg) => toast.error(msg);
  const alertSuccess = (msg) => toast.success(msg);

  let rejexEmail = "[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+[.]+[a-z]{2,3}$"; // checking for correct email id
  let rejexPassword =
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})";

  const postData = () => {
    let resp = email.match(rejexEmail);

    if (!resp) {
      return alertError("Invalid email id");
    } else if (!password.match(rejexPassword)) {
      return alertError(
        "password must contain at least 8 character, including at least one number, including both upper case and lower case and characters for example #?!@"
      );
    }

    setLoading(true);
    // sending data to server
    fetch(`https://buyc-corp-ts7x.onrender.com/user/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        email: email,
        mobile: mobile,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.err) {
          alertError(data.err.error);
          setLoading(false);
        } else {
          alertSuccess(data.msg);
          setLoading(false);
          navigate("/signin");
        }
        console.log(data);
      });
  };

  if (loading) {
    return (
      <div className="loader">
        <div id="wifi-loader">
          <svg class="circle-outer" viewBox="0 0 86 86">
            <circle class="back" cx="43" cy="43" r="40"></circle>
            <circle class="front" cx="43" cy="43" r="40"></circle>
            <circle class="new" cx="43" cy="43" r="40"></circle>
          </svg>
          <svg class="circle-middle" viewBox="0 0 60 60">
            <circle class="back" cx="30" cy="30" r="27"></circle>
            <circle class="front" cx="30" cy="30" r="27"></circle>
          </svg>
          <svg class="circle-inner" viewBox="0 0 34 34">
            <circle class="back" cx="17" cy="17" r="14"></circle>
            <circle class="front" cx="17" cy="17" r="14"></circle>
          </svg>
          <div class="text" data-text="Signing UP"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
          <img className="signUpLogo" src="" alt="" />

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
              type="text"
              name="name"
              id="name"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <input
              type="text"
              name="mobile"
              id="mobile"
              placeholder="mobile"
              value={mobile}
              onChange={(e) => setmobile(e.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <p
            className="loginPara"
            style={{ fontSize: "12px", margin: "3px 0px" }}
          >
            By Signing up, You agree to out Terms, <br /> Privacy policy and
            cookies Policy.
          </p>

          <input
            type="submit"
            id="submit-btn"
            value="Sign-Up"
            onClick={() => postData()}
          />
        </div>

        <div className="form2">
          Already Have an account ?{" "}
          <Link to="/signin">
            <span
              style={{
                color: "tomato",
                cursor: "pointer",
                fontWeight: "bolder",
              }}
            >
              Sign in
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
