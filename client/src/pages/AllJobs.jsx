import { toast } from "react-toastify";
import { JobsContainer, SearchContainer } from "../components";
import apiFetch from "../utils/apiFetch";
import { useLoaderData } from "react-router-dom";
import { useContext, createContext } from "react";
import { useQuery } from "@tanstack/react-query";

const allJobsQuery = (params) => {
  const { search, jobStatus, jobType, sort, page } = params;
  return {
    queryKey: [
      "jobs",
      search ?? "",
      jobStatus ?? "All",
      jobType ?? "All",
      sort ?? "Newest",
      page ?? 1,
    ],
    queryFn: async () => {
      const { data } = await apiFetch.get("/jobs", { params });
      return data;
    },
  };
};

export const allJobsLoader =
  (queryClient) =>
  async ({ request }) => {
    // Collect the search parameters from the URL
    const params = Object.fromEntries([
      ...new URL(request.url).searchParams.entries(),
    ]);
    await queryClient.ensureQueryData(allJobsQuery(params));
    return { searchValues: { ...params } };
  };

const AllJobsContext = createContext();
const AllJobs = () => {
  const { searchValues } = useLoaderData();
  const { data } = useQuery(allJobsQuery(searchValues));
  return (
    <AllJobsContext.Provider value={{ data, searchValues }}>
      <SearchContainer />
      <JobsContainer />
    </AllJobsContext.Provider>
  );
};

export const useAllJobsContext = () => useContext(AllJobsContext);

export default AllJobs;
