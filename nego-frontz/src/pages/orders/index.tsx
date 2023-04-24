import React, { useCallback, useContext, useState } from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import CheckBox from "@inovua/reactdatagrid-community/packages/CheckBox";

// Components
import { OrderPass } from "@/components/Orders";
import { Button, Group } from "@mantine/core";
import ReactDataGrid from "@inovua/reactdatagrid-community";
import { UserContext } from "@/context/UserContext";
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
  const { isAdmin } = useContext(UserContext);
  const [selected, setSelected] = useState({ 1: true, 2: true });

  const onSelectionChange = useCallback(({ selected: selectedMap }) => {
    setSelected(selectedMap);
  }, []);

  return (
    <div>
      <h1>Liste des commandes</h1>
      <p>
        Selected rows:{" "}
        {selected == null ? "none" : JSON.stringify(Object.keys(selected))}.
      </p>
      <p>You can shift+click grid rows to select multiple rows</p>
      {isAdmin && (
        <>
          <OrderPass />
          <DynamicDataGrid
            idProperty="id"
            columns={columns}
            checkboxColumn={true}
            dataSource={data}
            sortable={true}
            multiSelect={true}
            selected={selected}
            onSelectionChange={onSelectionChange}
            defaultLimit={10}
            style={{ minHeight: 400 }}
          />
        </>
      )}
      {!isAdmin && (
        <>
          <Group>
            <Button
              radius="md"
              style={{ flex: 1 }}
              type="submit"
              disabled={selected === null || selected === undefined || selected == []}
            >
              Delete
            </Button>
            <Button
              radius="md"
              style={{ flex: 1 }}
              type="submit"
              disabled={selected === null || selected === undefined}
            >
              Add
            </Button>
          </Group>
          <DynamicDataGrid
            idProperty="id"
            columns={columns}
            checkboxColumn={true}
            dataSource={data}
            sortable={true}
            multiSelect={true}
            selected={selected}
            onSelectionChange={onSelectionChange}
            defaultLimit={10}
            style={{ minHeight: 400 }}
          />{" "}
        </>
      )}
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
