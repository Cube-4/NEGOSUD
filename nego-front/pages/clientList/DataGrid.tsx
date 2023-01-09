import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";

export default function DataGrid({ user }: any) {
  const gridStyle = { minHeight: 600 };

  const columns = [
    {
      name: "id",
      header: "Id",
      defaultVisible: false,
      defaultWidth: 80,
      type: "number",
    },
    { name: "firstName", header: "Prénom", defaultFlex: 1 },
    {
      name: "lastName",
      header: "Nom de famille",
      defaultFlex: 1,
      type: "string",
    },
    {
      name: "email",
      header: "email",
      defaultFlex: 1,
    },
  ];

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        // defaultFilterValue={filterValue}
        columns={columns}
        dataSource={user}
      />
    </>
  );
}
