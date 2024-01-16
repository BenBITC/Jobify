import Wrapper from "../assets/wrappers/JobsContainer";
import { useAllJobsContext } from "../pages/AllJobs";
import Job from "./Job";
import PageButtonContainer from "./PageButtonContainer";

const JobsContainer = () => {
  const { data } = useAllJobsContext();
  const { jobs, totalJobs, totalPages, currentPage } = data;
  if (jobs.length === 0) {
    return (
      <Wrapper>
        <h2>No jobs to display...</h2>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h5>
        {totalJobs} job{jobs.length > 1 && "s"}
      </h5>
      <div className="jobs">
        {jobs.map((job) => {
          return <Job key={job._id} {...job} />;
        })}
      </div>
      {totalPages > 1 && <PageButtonContainer />}
    </Wrapper>
  );
};
export default JobsContainer;
