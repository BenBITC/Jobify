import { useState } from "react";

import BarChartComponent from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ monthlyStats }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      {barChart ? (
        <BarChartComponent data={monthlyStats} />
      ) : (
        <AreaChart data={monthlyStats} />
      )}
      <button
        className="btn form-btm"
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "Switch to Area Chart" : "Switch to Bar Chart"}
      </button>
    </Wrapper>
  );
};
export default ChartsContainer;
