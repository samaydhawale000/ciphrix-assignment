"use client";

import { useState } from "react";
import axios from "axios";
import "./page.css";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Field, Input, Box, Heading, Text } from "@chakra-ui/react";
import { getServerUrl } from "../helperFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loding from "../commonComponents/Loding";

export default function Login() {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const bg = isLight ? "white" : "gray.800";
  const text = isLight ? "black" : "white";
  const inputBg = isLight ? "gray.100" : "gray.600";
  const border = isLight ? "gray.300" : "gray.500";

  const handleLogin = async () => {
    if (!mobile || !password) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${getServerUrl()}/v1/login-user`,
        { mobile, password },
        { headers: { "Content-Type": "application/json" } }
      );

      if (data?.token) {
        localStorage.setItem("token", data?.token);
      }
      if (data?.userDetails) {
        localStorage.setItem("userDetails", JSON.stringify(data?.userDetails));
      }
      toast.success(data?.message);
      setMobile("");
      setPassword("");
      navigate("/");
    } catch (error) {
      const msg =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box className="loginWrapper">
      <Box
        p="6"
        borderRadius="md"
        bg={bg}
        color={text}
        border="1px solid"
        borderColor={border}
        display="flex"
        flexDirection="column"
        gap="20px"
      >
        <div className="navbar-left">
          <h1 className="title">Ciphrix</h1>
        </div>
        <Heading>Login</Heading>
        <Field.Root required>
          <Field.Label color={text}>Mobile</Field.Label>
          <Input
            placeholder="Enter mobile number"
            bg={inputBg}
            color={text}
            borderColor={border}
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label color={text}>Password</Field.Label>
          <Input
            type="password"
            placeholder="Enter password"
            bg={inputBg}
            color={text}
            borderColor={border}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field.Root>

        <Button
          bgColor="blue.500"
          color="white"
          onClick={handleLogin}
          isLoading={loading}
        >
          Login
        </Button>
        <Box textAlign="center" mt="2" color={text}>
          Don't have an account?
          <Button
            variant="link"
            color="blue.400"
            ml="1"
            onClick={() => navigate("/sign-up")}
          >
            Sign Up
          </Button>
        </Box>
        <Box>
          <Text fontSize={12} textAlign={'center'}>Admin User: No - 1111111111, Pass- admin@123</Text>
          <Text  fontSize={12} textAlign={'center'}>Normal User: No - 2222222222, Pass- normal@123</Text>
        </Box>
      </Box>
      {loading && <Loding />}
    </Box>
  );
}
