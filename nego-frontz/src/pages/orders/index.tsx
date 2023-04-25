import React, { useCallback, useState } from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";

// Components
import { OrderAdd } from "@/components/Orders";
import { Button, Group } from "@mantine/core";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import authProtected from "@/components/authProtected";
import {
  TypeRowSelection,
  TypeDataSource,
} from "@inovua/reactdatagrid-community/types";
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

function Page({ orders }: any) {
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState({});
  const router = useRouter();

  const onSelectionChange = useCallback(({ selected: selectedMap }: any) => {
    setSelected(selectedMap);
  }, []);

  const deleteId = async (selected: object) => {
    setIsLoading(true);
    for (let id in selected) {
      await axios.delete(`http://localhost:44312/api/order/${id}`, {
        headers: authHeader(),
      });
    }
    router.replace(router.asPath);
    setIsLoading(false);
  };

  return (
    <div>
      <h1>Liste des commandes</h1>
      {isAdmin && (
        <>
          <OrderAdd />
          <DynamicDataGrid
            idProperty="id"
            columns={columns}
            checkboxColumn={true}
            dataSource={orders}
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
            setSelected={setSelected}
            isLoading={isLoading}
          />
        </>
      )}
      {!isAdmin && (
        <>
          <ReactDataGrid
            idProperty="id"
            columns={columns}
            checkboxColumn={true}
            dataSource={orders}
            sortable={true}
            multiSelect={true}
            selected={selected}
            onSelectionChange={(e) => onSelectionChange(e)}
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
    <Button
      radius="md"
      style={{ flex: 1 }}
      disabled={props.selected && Object.keys(props.selected).length === 0}
      onClick={() => {
        props.deleteId(props.selected);
        props.setSelected({});
      }}
      loading={props.isLoading}
    >
      Supprimer les commandes
    </Button>
  );
};

export async function getServerSideProps() {
  const orders = await fetch("http://localhost:44312/api/order").then((res) =>
    res.json()
  );

  return {
    props: { orders: orders },
  };
}
