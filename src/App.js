import { useState } from "react";
import "./App.scss";

import { dummy_data } from "./dummy-data";
import OrgChart from "./org-chart/OrgChart";

function App() {
  const [chartValue, setChartValue] = useState(dummy_data);

  return (
    <div className="App">
      <OrgChart
        chartData={chartValue}
        onChange={(e) => setChartValue(e.target.value)}
      />
    </div>
  );
}

export default App;
