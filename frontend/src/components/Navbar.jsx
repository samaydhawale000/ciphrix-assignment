import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import "./components.css";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className={`navbar ${colorMode === "dark" ? "dark" : "light"}`}>
      <div className="navbar-left">
        <h1 className="title">Ciphrix</h1>
      </div>

      <div className="navbar-right">
        <IconButton
          aria-label="Search database"
          onClick={toggleColorMode}
          bgColor="blue.400"
        >
          {colorMode === "light" ? <MdOutlineDarkMode /> : <LuSun />}
        </IconButton>
        <div className="user-info">
          <div className="avatar">
            <FaRegUserCircle size={28}/>
          </div>
          <div className="user">
            <span >Samay</span>
            <span >Samay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
