import React, { Component, useState, useEffect } from "react";
import "./App.css";
import { Table, Input, Button } from "antd";
import axios from "axios";
import Pieces from "./Pieces";
const columns = [
  { title: "订单号", dataIndex: "id" },
  { title: "日期", dataIndex: "date" },
  { title: "时间", dataIndex: "time" },
  { title: "最新物流", dataIndex: "location" },
];

const expendCol = [
  { title: "日期", dataIndex: "date" },
  { title: "时间", dataIndex: "time" },
  { title: "最新物流", dataIndex: "location" },
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
        `https://3q2o636102.wicp.vip/queryOrder?id=${cacheIds}`
      );
      const formatData = data.results.map((v) => {
        const { id, checkpoints } = v;
        const [{ location, date, time, pIds }] = checkpoints;
        return { id, location, date, time, checkpoints, pIds };
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
        rowKey="id"
        expandable={{
          expandedRowRender: (record) => (
            <table>
              <tr>
                {expendCol.map((th) => {
                  return <th key={th.dataIndex}>{th.title}</th>;
                })}
                <th>Pieces</th>
              </tr>
              {record.checkpoints.map((row) => {
                return (
                  <tr className="expend">
                    {expendCol.map((th) => {
                      return <td key={th.dataIndex}>{row[th.dataIndex]}</td>;
                    })}
                    <td>
                      <Pieces data={record.pIds} />
                    </td>
                  </tr>
                );
              })}
            </table>
          ),
          rowExpandable: (record) => !!record.checkpoints,
        }}
        pagination={false}
      ></Table>
    </div>
  );
};
export default App;
