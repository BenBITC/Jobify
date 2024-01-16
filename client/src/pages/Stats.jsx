import { ChartsContainer, StatsContainer } from "../components";
import { useLoaderData } from "react-router-dom";
import apiFetch from "../utils/apiFetch";

export const statsLoader = async () => {
  try {
    const response = await apiFetch.get("jobs/stats");
    return response.data;
  } catch (error) {
    return error;
  }
};

const Stats = () => {
  const { statusStats, monthlyStats } = useLoaderData();

  return (
    <>
      <StatsContainer statusStats={statusStats} />
      {monthlyStats?.length > 1 && (
        <ChartsContainer monthlyStats={monthlyStats} />
      )}
    </>
  );
};
export default Stats;
