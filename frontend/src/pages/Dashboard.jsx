import React from "react";
import DashboardComponent from "../components/dashboard/DashboardComponent";
import "./page.css";
import { useColorMode } from "@chakra-ui/color-mode";

export default function Dashboard() {
  const { colorMode } = useColorMode();
  return (
    <div
      className={`dashboard ${
        colorMode == "light" ? "lightDashboard" : "darkDashboard"
      }`}
    >
      <DashboardComponent />
    </div>
  );
}
