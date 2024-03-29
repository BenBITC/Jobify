import { redirect } from "react-router-dom";
import apiFetch from "../utils/apiFetch";
import { toast } from "react-toastify";

export const deleteJobAction =
  (queryClient) =>
  async ({ params }) => {
    try {
      await apiFetch.delete(`jobs/${params.id}`);
      queryClient.invalidateQueries(["jobs"]);
      toast.success("Job deleted successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return redirect("/dashboard/all-jobs");
  };
