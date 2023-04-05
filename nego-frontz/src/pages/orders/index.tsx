import React from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
// Components
import { OrderPass } from "@/components/Orders";
//---- import component as dynamic -----//
const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

//---- Create your page using the dynamic component -----//
export default function Page({ data }: any) {
  return (
    <div>
      <h1>Liste des commandes fournisseur</h1>
      <OrderPass />
      <DynamicDataGrid
        idProperty="id"
        columns={columns}
        dataSource={data}
        defaultLimit={10}
        style={{ minHeight: 400 }}
      />
    </div>
  );
}

export async function getServerSideProps() {
  const orders = await fetch("http://localhost:44312/api/order").then((res) =>
    res.json()
  );

  return {
    props: { data: orders },
  };
}
