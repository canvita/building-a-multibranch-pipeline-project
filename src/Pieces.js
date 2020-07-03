import React, { Component, useState, useEffect } from "react";
import "./App.css";

const Pieces = (props) => {
  const [expend, setExpend] = useState(false);
  const { data = [] } = props;
  return (
    <div>
      <div
        onClick={() => setExpend(!expend)}
        style={{ cursor: "pointer", color: "rgb(24,144,255)" }}
      >
        {data.length} Pieces {expend ? "收起-" : "展开+"}
      </div>

      {expend && data.map((v) => <div>{v}</div>)}
    </div>
  );
};

export default Pieces;
