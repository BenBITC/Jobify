import { FormRow, FormRowSelect, SubmitButton } from "../components";
import Wrapper from "../assets/wrappers/DashboardFormPage";
import { useLoaderData, useParams } from "react-router-dom";
import { JOB_STATUS, JOB_TYPE } from "../../../server/utils/constants";
import { Form, redirect } from "react-router-dom";
import { toast } from "react-toastify";
import apiFetch from "../utils/apiFetch";
import { useQuery } from "@tanstack/react-query";

const singleJobQuery = (id) => {
  return {
    queryKey: ["singleJob", id],
    queryFn: async () => {
      const { data } = await apiFetch.get(`/jobs/${id}`);
      return data;
    },
  };
};

export const editJobLoader =
  (queryClient) =>
  async ({ params }) => {
    await queryClient.ensureQueryData(singleJobQuery(params.id));
    return params.id;
  };

export const editJobaction =
  (queryClient) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      await apiFetch.patch(`/jobs/${params.id}`, data);
      queryClient.invalidateQueries(["jobs"]);
      queryClient.invalidateQueries(["singleJob"]);
      toast.success("Job updated");
      return redirect("/dashboard/all-jobs");
    } catch (error) {
      toast.error(error?.response?.data?.message);
      return error;
    }
  };

const EditJob = () => {
  const id = useLoaderData();
  const {
    data: { job },
  } = useQuery(singleJobQuery(id));

  return (
    <Wrapper>
      <Form className="form" method="post">
        <h4 className="form-title">edit job</h4>
        <div className="form-center">
          <FormRow type="text" name="position" defaultValue={job.position} />
          <FormRow type="text" name="company" defaultValue={job.company} />
          <FormRow
            type="text"
            name="jobLocation"
            labelText="job location"
            defaultValue={job.jobLocation}
          />
          <FormRowSelect
            name="jobStatus"
            labelText="job status"
            defaultValue={job.jobStatus}
            selectOptions={Object.values(JOB_STATUS)}
          />
          <FormRowSelect
            name="jobType"
            labelText="job type"
            defaultValue={job.jobType}
            selectOptions={Object.values(JOB_TYPE)}
          />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default EditJob;
