import React from "react";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import "@inovua/reactdatagrid-community/index.css";
import NumberFilter from "@inovua/reactdatagrid-community/NumberFilter";
import SelectFilter from "@inovua/reactdatagrid-community/SelectFilter";
import DateFilter from "@inovua/reactdatagrid-community/DateFilter";

export default function DataGrid({ order }: any) {
  const gridStyle = { minHeight: 600 };


  const columns = [
    {
      name: "id",
      header: "Id",
      defaultVisible: false,
      defaultWidth: 80,
      type: "number",
    },
    {
      name: "OrderName",
      header: "Commande",
      defaultFlex: 1,
      type: "number",
      filterEditor: NumberFilter,
    },
    {
      name: "OrderDate",
      header: "Date de la commande",
      defaultFlex: 1,
      type: "date",
    },
    {
      name: "supplierName",
      header: "Client",
      defaultFlex: 1,
    },
    {
      name: "quantity",
      header: "Quantité",
      defaultFlex: 1,
    },
    {
      name: "article",
      header: "Article",
      defaultFlex: 1,
    }
  ];
  const dataSource = [
    { id: 1, OrderName: "test", OrderDate: "2021-01-01", supplier: "Enzo Midonet", quantity: 1, article: "testA" },
    { id: 2, OrderName: "test2", OrderDate: "2021-01-01", supplier: "Enzo Midonet", quantity: 1, article: "testB" },
    { id: 3, OrderName: "test3", OrderDate: "2021-01-01", supplier: "Enzo Midonet", quantity: 1, article: "testC" },
    
  ];

  return (
    <>
      <ReactDataGrid
        idProperty="id"
        style={gridStyle}
        // defaultFilterValue={filterValue}
        columns={columns}
        dataSource={order}
      />
    </>
  );
}
