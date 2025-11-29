"use client";

import { useState } from "react";
import axios from "axios";
import "./page.css";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  Button,
  Field,
  Input,
  Box,
  Heading,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { getServerUrl } from "../helperFunctions";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Loding from "../commonComponents/Loding";

const userTypes = createListCollection({
  items: [
    { label: "Normal", value: "normal" },
    { label: "Admin", value: "admin" },
  ],
});

export default function SignUp() {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const navigate = useNavigate();

  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const bg = isLight ? "white" : "gray.800";
  const text = isLight ? "black" : "white";
  const inputBg = isLight ? "gray.100" : "gray.600";
  const border = isLight ? "gray.300" : "gray.500";

  const handleSignUp = async () => {
    if (!mobile || !password || !userType || !confirmPassword|| !name) {
      toast.error("All fields are required");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        `${getServerUrl()}/v1/create-user`,
        { mobile, password,confirmPassword, userType, name },
        { headers: { "Content-Type": "application/json" } }
      );

      toast.success(data?.message);
      setMobile("");
      setName("");
      setPassword("");
      setConfirmPassword("");
      setUserType("");
      navigate("/login");
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

        <Heading>Sign Up</Heading>

        <Field.Root required>
          <Field.Label color={text}>Name</Field.Label>
          <Input
            placeholder="Enter Name"
            bg={inputBg}
            color={text}
            borderColor={border}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field.Root>
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
        <Field.Root required>
          <Field.Label color={text}>Confirm Password</Field.Label>
          <Input
            type="password"
            placeholder="Enter confirm password"
            bg={inputBg}
            color={text}
            borderColor={border}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Field.Root>

        <Field.Root required>
          <Field.Label color={text}>User Type</Field.Label>
          <Select.Root
            collection={userTypes}
            size="sm"
            portalProps={{ appendToParentPortal: false }}
            value={userType ? [userType] : []}
            onValueChange={(detail) => setUserType(detail.value[0])}
          >
            <Select.HiddenSelect />
            <Select.Control>
              <Select.Trigger bg={inputBg} color={text} borderColor={border}>
                <Select.ValueText placeholder="Select user type" />
              </Select.Trigger>
            </Select.Control>
            <Select.Positioner zIndex={9999}>
              <Select.Content bg={bg} color={text} borderColor={border} border="1px solid">
                {userTypes.items.map((opt) => (
                  <Select.Item item={opt} key={opt.value}>
                    {opt.label}
                    <Select.ItemIndicator />
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Positioner>
          </Select.Root>
        </Field.Root>

        <Button
          bgColor="blue.500"
          color="white"
          onClick={handleSignUp}
          isLoading={loading}
        >
          Sign Up
        </Button>

        <Box textAlign="center" mt="2" color={text}>
          Already have an account?
          <Button
            variant="link"
            color="blue.400"
            ml="1"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
        </Box>
      </Box>
      {loading && <Loding />}
    </Box>
  );
}
