import React from "react";
import "./dashboard.css";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button } from "@chakra-ui/react";
import TaskCard from "./TaskCard";

export default function DashboardComponent() {
  const { colorMode } = useColorMode();

  return (
    <div className="DashboardComponent">
      <div className="headingWrapper">
        <h2 style={{color:colorMode=='light'? 'black':'#fff'}}>Dashboard</h2>
        <Button bgColor={"blue.500"}>Add Task</Button>
      </div>
      <div className="cardsWrapper">
        {[1,1,1,1,1,1,1,1]?.map((ele)=>{
          return <TaskCard />
        })}
      </div>
    </div>
  );
}
