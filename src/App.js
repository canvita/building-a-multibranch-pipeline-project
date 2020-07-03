import React, { Component, useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Table, Input, Button } from "antd";
import axios from "axios";

const columns = [
  { title: "订单号", dataIndex: "id" },
  { title: "最新物流", dataIndex: "latest" },
];
const IDS_KEY = "IDS_KEY";
const App = () => {
  const [datasource, setDataSource] = useState([]);
  const [ids, setIds] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(async () => {
    const cacheIds = localStorage.getItem(IDS_KEY);
    setIds(cacheIds);
    refresh();
  }, []);
  const refresh = async () => {
    const cacheIds = localStorage.getItem(IDS_KEY);
    if (cacheIds) {
      setLoading(true);
      const { data } = await axios.get(
        "http://localhost:3000/queryOrder?id=" + cacheIds
      );
      const formatData = data.results.map((v) => {
        const {
          id,
          checkpoints: { location },
        } = v;
        return { id, latest: location };
      });
      setDataSource(formatData);
      setLoading(false);
    }
  };
  return (
    <div style={{ padding: 10 }}>
      <Input
        value={ids}
        onChange={(e) => {
          setIds(e.target.value);
          localStorage.setItem(IDS_KEY, e.target.value);
        }}
        placeholder="输入订单号, 用英文逗号分隔: ','  就是这个逗号"
      />
      <div style={{ margin: "10px 0" }}>
        输入订单号, 用英文逗号分隔: ',' 就是这个逗号
      </div>
      <Button onClick={refresh} type="primary">
        刷新物流
      </Button>
      <Table
        columns={columns}
        loading={loading}
        dataSource={datasource}
      ></Table>
    </div>
  );
};
export default App;
