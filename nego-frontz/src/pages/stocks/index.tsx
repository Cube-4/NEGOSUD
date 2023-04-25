import React, { useCallback, useState } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
// Context
// Components
import { UserStocks } from "@/components/Stocks";
// Mantine
import { Button, Flex } from "@mantine/core";
import { ArticlesAdd } from "@/components/Articles";
import authProtected from "@/components/authProtected";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";
import { useRouter } from "next/router";

const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

function AdminContent({ articles }: any) {
  const router = useRouter();
  const [selected, setSelected] = useState({});
  const onSelectionChange = useCallback(({ selected: selectedMap }: any) => {
    setSelected(selectedMap);
  }, []);

  const deleteId = async (selected: object) => {
    console.log(selected);
    for (let id in selected) {
      await axios.delete(`http://localhost:44312/api/article/${id}`, {
        headers: authHeader(),
      });
    }
    router.replace(router.asPath);
  };

  const Buttons = (props: any) => {
    return (
      <Button
        mt="3vh"
        style={{ flex: 1 }}
        disabled={props.selected && Object.keys(props.selected).length === 0}
        onClick={() => {
          props.deleteId(props.selected);
          props.setSelected({});
        }}
      >
        Supprimer les articles
      </Button>
    );
  };

  return (
    <>
      <ArticlesAdd />
      <DynamicDataGrid
        idProperty="id"
        columns={columns}
        checkboxColumn={true}
        sortable={true}
        multiSelect={true}
        selected={selected}
        onSelectionChange={onSelectionChange}
        dataSource={articles}
        defaultLimit={10}
        style={{ minHeight: 400 }}
      />
      <Buttons
        selected={selected}
        deleteId={deleteId}
        setSelected={setSelected}
      />
    </>
  );
}

function Page({ articles }: any) {
  const isAdmin = localStorage.getItem("isAdmin") || "";

  return (
    <div>
      <h1>Liste des articles</h1>
      {isAdmin === "false" ? (
        <UserStocks articles={articles} />
      ) : (
        <AdminContent articles={articles} />
      )}
    </div>
  );
}

export default authProtected(Page);

export async function getServerSideProps() {
  const articles = await fetch("http://localhost:44312/api/article").then(
    (res) => res.json()
  );

  return { props: { articles: articles } };
}
