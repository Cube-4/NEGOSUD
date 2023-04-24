import React, { useState, useEffect } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";
import "@inovua/reactdatagrid-community/index.css";
import { columns } from "./columns";
import type TypeDataGridProps from "@inovua/reactdatagrid-community/types/TypeDataGridProps";
// Context
// Components
import { UserStocks } from "@/components/Stocks";
// Mantine
import { Flex } from "@mantine/core";
import { ArticlesAdd } from "@/components/Articles";
import authProtected from "@/components/authProtected";
import axios from "axios";
import authHeader from "@/helpers/auth-headers";
import { useAuth } from "@/components/AuthContext";

const DynamicDataGrid = dynamic(
  (() => {
    return import("@inovua/reactdatagrid-community");
  }) as DynamicOptions<Partial<TypeDataGridProps>>,
  {
    ssr: false,
  }
);

function AdminContent({ articles }: any) {
  return (
    <>
      <ArticlesAdd />
      <DynamicDataGrid
        idProperty="id"
        columns={columns}
        dataSource={articles}
        defaultLimit={10}
        style={{ minHeight: 400 }}
      />
    </>
  );
}

function Page({ articles }: any) {
  const { isAdmin, roles } = useAuth();

  return (
    <div>
      <h1>Liste des articles</h1>
      {!isAdmin && <UserStocks articles={articles} />}

      {isAdmin && <AdminContent articles={articles} />}
    </div>
  );
}

export default authProtected(Page);

export async function getServerSideProps() {
  const response = await axios.get("http://localhost:44312/api/article", {
    headers: authHeader(),
  });
  const articles = response.data;

  return { props: { articles } };
}
