import React, { useState } from "react";
import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import MasterLayout from "../Layouts/MasterLayout";
import AddUser from "../pages/AddUser";
import Login from "../pages/Login";
import Help from "../pages/Help";
import ErrorPage from "../pages/ErrorPage";
import routes from "./routes.json";
import ProfilePage from "../ProfilePage/ProfilePage";

const ParentComponent = () => {
  const [userData, setUserData] = useState(null);

  const updateUser = (user) => {
    setUserData(user);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path={routes.HOME} element={<MasterLayout />}>
          <Route index element={<Home />} />
          <Route
            path={routes.PROFILES}
            element={<ProfilePage userData={userData} />}
          />
          <Route
            path={routes.ADD_USER}
            element={<AddUser updateUser={updateUser} />}
          />
          <Route path={routes.LOGIN} element={<Login />} />
          <Route path={routes.HELP} element={<Help />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
        <Route path="*" element={<Navigate to={routes.HOME} />} />{" "}
        {/* Redirect to HOME if route not found */}
      </Routes>
    </BrowserRouter>
  );
};

export default ParentComponent;
