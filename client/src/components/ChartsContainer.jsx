import { useState } from "react";

import BarChartComponent from "./BarChart";
import AreaChart from "./AreaChart";
import Wrapper from "../assets/wrappers/ChartsContainer";

const ChartsContainer = ({ monthlyStats }) => {
  const [barChart, setBarChart] = useState(true);

  return (
    <Wrapper>
      <h4>Monthly Applications</h4>
      <button
        className="btn form-btm"
        type="button"
        onClick={() => setBarChart(!barChart)}
      >
        {barChart ? "Area Chart" : "Bar Chart"}
      </button>
      {barChart ? (
        <BarChartComponent data={monthlyStats} />
      ) : (
        <AreaChart data={monthlyStats} />
      )}
    </Wrapper>
  );
};
export default ChartsContainer;
