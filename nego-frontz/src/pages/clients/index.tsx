import React from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import axios from "axios";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import authHeader from "@/helpers/auth-headers"

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
  const products = await axios.get("http://localhost:44312/api/user", 
    {
      headers: authHeader()
    }
  )

  return {
    props: { data: products },
  };
}
