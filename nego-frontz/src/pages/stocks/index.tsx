import React, { useContext } from "react";


import Notification from "@/components/Notifications/Notifications";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
// Context
import { UserContext } from "@/context/UserContext";
// Components
import { UserStocks } from "@/components/Stocks";
// Mantine
import { Flex } from "@mantine/core";

const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

export default function Page({ data }: any) {
  const { isAdmin } = useContext(UserContext);

  return (
    <div>
      <h1>Liste des articles</h1>
      {/* <Notification /> */}
      {!isAdmin && <UserStocks products={data} />}
      {isAdmin && (
        <DynamicDataGrid
          idProperty="id"
          columns={columns}
          dataSource={data}
          defaultLimit={10}
          style={{ minHeight: 400 }}
        />
      )}
    </div>
  );
}

export async function getServerSideProps() {
  const products = await fetch("http://localhost:44312/api/article").then(
    (res) => res.json()
  );

  return {
    props: { data: products },
  };
}
