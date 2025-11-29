import React, { useState } from "react";
import { Badge, Box, Button, Card, HStack, Image } from "@chakra-ui/react";
import { useColorMode } from "@chakra-ui/color-mode";
import { dateFormatDayMonthYear, getServerUrl, getToken, getUserDetails } from "../../helperFunctions";
import { UpdateTaskForm } from "./UpdateTaskForm";
import Loding from "../../commonComponents/Loding";
import axios from "axios";
import toast from "react-hot-toast";

export default function TaskCard({
  title,
  description,
  date,
  status,
  id,
  getEquipmentList,
  setLoading
}) {
  const { colorMode } = useColorMode();

   const handleDelete = async () => {
    try {
      setLoading(true);

      const { data } = await axios.delete(
        `${getServerUrl()}/v1/delete-task?id=${id}`,
        {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${getToken()}`,
                  },
                }
      );

      toast.success(data?.message || "Task deleted");
      getEquipmentList();
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
    <Card.Root
      bgColor={colorMode == "light" ? "white" : "black"}
      borderColor={colorMode == "dark" && "gray.700"}
    >
      <Box>
        <Card.Body>
          <Card.Title mb="2" color={colorMode == "light" ? "black" : "white"}>
            {title}
          </Card.Title>
          <Card.Description color={colorMode == "dark" && "gray.300"}>
            {description}
          </Card.Description>
          <Card.Description
            color={colorMode == "dark" && "gray.300"}
            fontWeight={600}
            marginTop={2}
          >
            {` Created Date : ${dateFormatDayMonthYear(date)}`}
          </Card.Description>
          <HStack mt="4">
            <Badge
              bgColor={status == "completed" ? "green.400" : "orange.400"}
              style={{ textTransform: "capitalize" }}
            >
              {status}
            </Badge>
          </HStack>
        </Card.Body>
        <Card.Footer>
          <UpdateTaskForm getEquipmentList={getEquipmentList} id={id} setLoading={setLoading}/>
          {getUserDetails()?.userType == 'admin'  &&   <Button bgColor={"red.500"} onClick={handleDelete}>Delete</Button>}
        </Card.Footer>
      </Box>
    </Card.Root>
  );
}
