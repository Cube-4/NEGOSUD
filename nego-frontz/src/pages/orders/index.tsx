import axios from "axios";
import { useEffect, useState } from "react";
import { DataGrid } from "@/components/stocksGrid";

export default function Orders() {
  const [isData, setIsData] = useState([]);
  async function loadData() {
    let returnData: any = [];
    await axios
      .get("http://localhost:44312/api/article")
      .then((response) => {
        returnData = response.data;
        console.log(returnData);
      })
      .catch((err) => {
        console.error(err);
        return err;
      });
    return returnData;
  }

  useEffect(() => {
    let dataSource = loadData();
    dataSource.then((res) => {
      setIsData(res);
    });
  }, []);

  return (
    <div>
      <h1>Orders</h1>

      <DataGrid articles={isData} />
    </div>
  );
}
