import React, { useEffect, useState } from "react";
import "../Css/Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "@chakra-ui/react";

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
    fetch(`https://buycar-corp.onrender.com/user/signup`, {
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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </div>
    );
  }

  return (
    <div className="signUp">
      <div className="form-container">
        <div className="form">
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
                color: "blue",
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
