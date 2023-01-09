import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

export default function DataGrid({ articles }: any) {
  const gridStyle = { minHeight: 600 };

  const columns = [
    {
      name: "id",
      header: "Id",
      defaultVisible: false,
      defaultWidth: 80,
      type: "number",
    },
    { name: "name", header: "Produit", defaultFlex: 1 },
    {
      name: "reference",
      header: "Référence",
      defaultFlex: 1,
    },
    {
      name: "date",
      header: "Date d'ajout",
      defaultFlex: 1,
      type: "date",
    },
    {
      name: "origin",
      header: "Origine du stock",
      defaultFlex: 1,
    },
    {
      name: "quantity",
      header: "Quantité",
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
        dataSource={articles}
      />
    </>
  );
}
