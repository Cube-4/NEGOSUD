import React, { useState, useEffect, useCallback } from "react";
import dynamic, { type DynamicOptions } from "next/dynamic";
import axios from "axios";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
import authHeader from "../../helpers/auth-headers";
import { ClientsAdd } from "@/components/Clients";
import authProtected from "@/components/authProtected";
import { useRouter } from "next/router";
import { Button, Group } from "@mantine/core";

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
function Page({ data }: any) {
  // const [clients, setClients] = useState([]);
  const [selected, setSelected] = useState({});
  const router = useRouter();

  const onSelectionChange = useCallback(({ selected: selectedMap }: any) => {
    setSelected(selectedMap);
  }, []);

  console.log(data);
  console.log(selected);

  const deleteId = async (selected: object) => {
    for (let id in selected) {
      await axios.delete(`http://localhost:44312/api/user/${id}`, {
        headers: authHeader(),
      });
    }
    router.replace(router.asPath);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const response = await axios.get("http://localhost:44312/api/user", {
  //       headers: authHeader(),
  //     });
  //     setClients(response.data);
  //   };
  //   fetchData();
  // }, []);

  return (
    <div>
      <h1>Liste de clients</h1>
      <ClientsAdd router={router} />
      <DynamicDataGrid
        idProperty="id"
        columns={columns}
        dataSource={data}
        checkboxColumn={true}
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
      />
    </div>
  );
}

export default authProtected(Page);

const Buttons = (props: any) => {
  return (
    <Group my={"3vh"}>
      <Button
        radius="md"
        style={{ flex: 1 }}
        disabled={props.selected && Object.keys(props.selected).length === 0}
        onClick={() => {
          props.deleteId(props.selected);
          props.setSelected({});
        }}
      >
        Supprimer les clients
      </Button>
    </Group>
  );
};

export async function getServerSideProps() {
  // const orders = await fetch("http://localhost:44312/api/order").then((res) =>
  //   res.json()
  // );
  const response = await axios.get("http://localhost:44312/api/user", {
    headers: authHeader(),
  });

  return {
    props: { data: response.data },
  };
}
