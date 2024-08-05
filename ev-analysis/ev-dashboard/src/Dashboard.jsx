import React from "react";
import { DashbaordNavbar } from "./DashbaordNavbar";
import MainContent from "./MainContent";

export const Dashboard = () => {
  return (
    <div className="layout-wrapper">
      <div className="page-content">
        <DashbaordNavbar/>
        <div className="px-3">
            <MainContent/>
        </div>
      </div>
    </div>
  );
};
