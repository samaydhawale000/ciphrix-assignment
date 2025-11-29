import React, { useEffect, useState } from "react";
import "./dashboard.css";
import { useColorMode } from "@chakra-ui/color-mode";
import { Button, Text } from "@chakra-ui/react";
import TaskCard from "./TaskCard";
import { AddTaskForm } from "./AddTaskForm";
import { getServerUrl, getToken } from "../../helperFunctions";
import axios from "axios";
import toast from "react-hot-toast";
import { PaginationButtons } from "../../commonComponents/PaginationButtons";
import Loding from "../../commonComponents/Loding";

export default function DashboardComponent() {
  const { colorMode } = useColorMode();
  const [page, setPage] = useState(1);
  const [searchString, setSearchString] = useState("");
  const [listData, setListData] = useState([]);
  const [Loading, setLoading] = useState([]);

  const getEquipmentList = async () => {
    setLoading(true);
    try {
      const dataToSend = {
        page,
        searchString,
      };

      const { data } = await axios.post(
        `${getServerUrl()}/v1/get-tasks`,
        dataToSend,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setListData(data);
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

  useEffect(() => {
    getEquipmentList();
  }, [page]);

  return (
    <div className="DashboardComponent">
      <div className="headingWrapper">
        <h2 style={{ color: colorMode == "light" ? "black" : "#fff" }}>
          Dashboard
        </h2>
        <AddTaskForm
          getEquipmentList={getEquipmentList}
          setLoading={setLoading}
        />
      </div>
      <div className="cardsWrapper">
        {listData?.result?.map((ele) => {
          return (
            <TaskCard
              title={ele?.title}
              description={ele?.description}
              date={ele?.createdAt}
              status={ele?.status}
              id={ele?._id}
              getEquipmentList={getEquipmentList}
              setLoading={setLoading}
            />
          );
        })}
      </div>
        {(listData?.result?.length == 0 || !listData?.result) &&<Text margin={'100px 0px'} textAlign={'center'}>Data Not Found !</Text>}
      <div className="paginationWrapper">
        <PaginationButtons
          currentPage={page}
          totalPages={listData?.totalPages}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
      {Loading && <Loding />}
    </div>
  );
}
