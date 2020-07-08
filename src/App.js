import React, { useState } from "react";
import "./App.css";

import Chart from "./components/Chart";
import Table from "./components/Table";

// Material UI Imports
import { Switch } from "@material-ui/core/";

function App() {
  const [toggle, setToggle] = useState(false);

  const toggler = () => {
    toggle ? setToggle(false) : setToggle(true);
  };
  return (
    <div className="App">
      <Switch onClick={toggler} />
      {toggle ? <Table /> : <Chart />}
    </div>
  );
}

export default App;
