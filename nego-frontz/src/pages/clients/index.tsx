import React from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";

//---- import component as dynamic with un poco de bricolaje --
const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

//---- Create your page using the dynamic component ------------
export default function Page({ data }: any) {
  console.log(data);

  return (
    <div>
      <h1>Liste de clients</h1>
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

//---- Bonus: Make your request serverSide ---------------------
export async function getServerSideProps() {
  const products = await fetch("http://localhost:44312/api/user").then((res) =>
    res.json()
  );

  return {
    props: { data: products },
  };
}
