import { ChartsContainer, StatsContainer } from "../components";
import apiFetch from "../utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const statsQuery = {
  queryKey: ["stats"],
  queryFn: async () => {
    const response = await apiFetch.get("jobs/stats");
    return response.data;
  },
};

export const statsLoader = (queryClient) => async () => {
  const data = await queryClient.ensureQueryData(statsQuery);
  return data;
};

const Stats = () => {
  const { data } = useQuery(statsQuery);
  const { statusStats, monthlyStats } = data;

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
