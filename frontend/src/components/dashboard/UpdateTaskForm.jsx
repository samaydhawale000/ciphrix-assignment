"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useColorMode } from "@chakra-ui/color-mode";
import {
  Button,
  CloseButton,
  Dialog,
  Field,
  Input,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import { getServerUrl, getToken } from "../../helperFunctions";
import toast from "react-hot-toast";
import { transformValue } from "framer-motion";

export const UpdateTaskForm = ({ id, getEquipmentList, setLoading }) => {
  const { colorMode } = useColorMode();
  const isLight = colorMode === "light";
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");
  const [status, setStatus] = useState("");

  const bg = isLight ? "white" : "gray.700";
  const text = isLight ? "black" : "white";
  const inputBg = isLight ? "gray.100" : "gray.600";
  const border = isLight ? "gray.300" : "gray.500";

  const getTaskById = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `${getServerUrl()}/v1/get-task-by-id?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setTitle(data?.result.title);
      setDesc(data?.result?.description);
      setStatus(data?.result?.status);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleOpen = (next) => {
    setOpen(next);
    if (next === true) {
      getTaskById();
    }
  };

  const updateTask = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${getServerUrl()}/v1/update-task`,
        {
          title,
          description,
          status,
          id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      toast.success(data?.message);

      getEquipmentList();
      setOpen(false);
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={(e) => handleOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button bgColor={"blue.500"} color="white">
          Edit
        </Button>
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content bgColor={bg} color={text}>
            <Dialog.CloseTrigger asChild>
              <CloseButton color={text} />
            </Dialog.CloseTrigger>

            <Dialog.Header>
              <Dialog.Title>Edit Task</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body className="addTaskFrom">
              <Field.Root required>
                <Field.Label color={text}>
                  Title <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Enter title here"
                  bg={inputBg}
                  color={text}
                  borderColor={border}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Field.Root>

              <Field.Root required>
                <Field.Label color={text}>
                  Description <Field.RequiredIndicator />
                </Field.Label>
                <Input
                  placeholder="Enter description here"
                  bg={inputBg}
                  color={text}
                  borderColor={border}
                  value={description}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </Field.Root>

              <Select.Root
                collection={options}
                size="sm"
                portalProps={{ appendToParentPortal: false }}
                value={status ? [status] : []}
                onValueChange={(detail) => setStatus(detail.value[0])}
              >
                <Select.HiddenSelect />
                <Select.Label color={text}>Status</Select.Label>

                <Select.Control>
                  <Select.Trigger
                    bg={inputBg}
                    color={text}
                    borderColor={border}
                  >
                    <Select.ValueText placeholder="Select Status" />
                  </Select.Trigger>
                  <Select.IndicatorGroup>
                    <Select.Indicator color={text} />
                  </Select.IndicatorGroup>
                </Select.Control>

                <Select.Positioner zIndex={9999}>
                  <Select.Content
                    bg={bg}
                    color={text}
                    borderColor={border}
                    border="1px solid"
                  >
                    {options.items.map((opt) => (
                      <Select.Item item={opt} key={opt.value}>
                        {opt.label}
                        <Select.ItemIndicator />
                      </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Select.Root>

              <Button bgColor="blue.500" color="white" onClick={updateTask}>
                Submit
              </Button>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};

const options = createListCollection({
  items: [
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ],
});
