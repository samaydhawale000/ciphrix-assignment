import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./protectedRoutes";
import PageNotFound from "../pages/PageNotFound";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

const RouteWrapper = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/login" element={<Login />} />
      <Route
        path="/"
        element={
          // <ProtectedRoutes>
            <Dashboard/>
          // </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default RouteWrapper;
