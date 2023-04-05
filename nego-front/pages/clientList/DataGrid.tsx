import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

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
    { name: "name", header: "Nom", defaultFlex: 1 },
    {
      name: "reference",
      header: "Référence",
      defaultFlex: 1,
      type: "number",
      filterEditor: NumberFilter,
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
  const dataSource = [
    { id: 1, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 2, name: "Rafael Longeville", reference: 35, date: "2021-01-01", origin: "France | Aquitaine", quantity: 15 },
    { id: 3, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 4, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 5, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 1, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 2, name: "Rafael Longeville", reference: 35, date: "2021-01-01", origin: "France | Aquitaine", quantity: 15 },
    { id: 3, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 4, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 5, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 1, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 2, name: "Rafael Longeville", reference: 35, date: "2021-01-01", origin: "France | Aquitaine", quantity: 15 },
    { id: 3, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 4, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    { id: 5, name: "Enzo Midonet", reference: 35, date: "2021-01-01", origin: "France", quantity: 10 },
    
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
