import React from "react";
import { useColorMode } from "@chakra-ui/color-mode";
import "./components.css";
import { IconButton } from "@chakra-ui/react";
import { MdOutlineDarkMode } from "react-icons/md";
import { LuSun } from "react-icons/lu";
import { FaRegUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { getUserDetails } from "../helperFunctions";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
const navigate = useNavigate()

  const handleLogout =()=>{
    localStorage.removeItem('userDetails')
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className={`navbar ${colorMode === "dark" ? "dark" : "light"}`}>
      <div className="logo">
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
        <IconButton
          aria-label="Search database"
          onClick={handleLogout}
          bgColor="red.400"
        >
          {<MdOutlineLogout />
}
        </IconButton>
        <div className="user-info">
          <div className="avatar">
            <FaRegUserCircle size={28}/>
          </div>
          <div className="user">
            <span >{getUserDetails()?.name}</span>
            <span style={{textTransform:'capitalize'}}>{getUserDetails()?.userType} User</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
