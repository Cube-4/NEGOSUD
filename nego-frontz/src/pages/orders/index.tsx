import React, { useCallback, useContext, useEffect, useState } from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { adminColumns, columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import CheckBox from "@inovua/reactdatagrid-community/packages/CheckBox";

// Components
import { OrderAdd } from "@/components/Orders";
import { Button, Group } from "@mantine/core";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import authProtected from "@/components/authProtected";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";
import { useRouter } from "next/router";
//---- import component as dynamic -----//
const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

function Page({ data }: any) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const userId = localStorage.getItem("id");
  const [userOrder, setUserOrder] = useState([]);
  const [selected, setSelected] = useState({});
  const [isSelectedConfirmed, setIsSelectedConfirmed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async (id: string | null) => {
      const response = await axios.get(
        `http://localhost:44312/api/user/${id}`,
        {
          headers: authHeader(),
        }
      );
      setUserOrder(response.data.orders);
    };
    fetchData(userId);
  }, []);

  const onSelectionChange = useCallback(({ selected: selectedMap }: any) => {
    setSelected(selectedMap);
    const test = (selectedMap: { [x: number]: { orderStatus: string } }) => {
      let testArray = [];
      for (let id in selectedMap) {
        testArray.push(selectedMap[id].orderStatus);
      }
      if (testArray.includes("Confirmed")) {
        return true;
      }
      return false;
    };
    setIsSelectedConfirmed(test(selectedMap));
  }, []);

  const deleteId = async (selected: object) => {
    for (let id in selected) {
      await axios.delete(`http://localhost:44312/api/order/${id}`, {
        headers: authHeader(),
      });
    }
    router.replace(router.asPath);
  };

  const confirmOrder = async (selected: object) => {
    for (let id in selected) {
      await axios.post(`http://localhost:44312/api/order/confirmOrder/${id}`, {
        headers: authHeader(),
      });
    }
    router.replace(router.asPath);
  };

  return (
    <div>
      <h1>Liste des commandes</h1>
      {isAdmin && (
        <>
          <OrderAdd />
          <ReactDataGrid
            idProperty="id"
            columns={adminColumns}
            checkboxColumn={true}
            dataSource={data}
            sortable={true}
            multiSelect={true}
            selected={selected}
            onSelectionChange={onSelectionChange}
            defaultLimit={10}
            style={{ minHeight: 400 }}
          />
          <Buttons
            selected={selected}
            deleteId={deleteId}
            confirmOrder={confirmOrder}
            test={isSelectedConfirmed}
            setSelected={setSelected}
          />
        </>
      )}
      {!isAdmin && (
        <>
          <ReactDataGrid
            idProperty="id"
            columns={columns}
            dataSource={userOrder}
            sortable={true}
            defaultLimit={10}
            style={{ minHeight: 400 }}
          />{" "}
        </>
      )}
    </div>
  );
}

export default authProtected(Page);

const Buttons = (props: any) => {
  return (
    <Group my={"3vh"}>
      <Button
        radius="md"
        style={{ flex: 1 }}
        color="red"
        disabled={props.selected && Object.keys(props.selected).length === 0}
        onClick={() => {
          props.deleteId(props.selected);
          props.setSelected({});
        }}
      >
        Delete
      </Button>
      <Button
        radius="md"
        style={{ flex: 1 }}
        disabled={
          (props.selected && Object.keys(props.selected).length === 0) ||
          (props.selected && props.test === true) ||
          (props.selected && Object.keys(props.selected).length > 1)
        }
        onClick={() => {
          props.confirmOrder(props.selected);
          props.setSelected({});
        }}
      >
        Confirm order
      </Button>
    </Group>
  );
};

export async function getServerSideProps() {
  const orders = await fetch("http://localhost:44312/api/order").then((res) =>
    res.json()
  );

  return {
    props: { data: orders },
  };
}
