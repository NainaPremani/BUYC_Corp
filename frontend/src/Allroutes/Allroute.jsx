import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from "../Components/Signup";
import Signin from "../Components/Signin";
import SellcarPage from "../Pages/SellcarPage";
import Home from "../Pages/Home";
import Yourpost from "../Pages/Yourpost";
import Description from "../Pages/Description";
import PrivateRoute from "../PrivateRoute";

const Allroute = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      ></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/signin" element={<Signin />}></Route>
      <Route path="/sellyourcar" element={<SellcarPage />}></Route>
      <Route path="/yourpost" element={<Yourpost />}></Route>
      <Route path="/description" element={<Description />}></Route>
    </Routes>
  );
};

export default Allroute;
