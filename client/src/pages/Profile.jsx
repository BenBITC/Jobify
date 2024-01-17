import Wrapper from "../assets/wrappers/DashboardFormPage";
import { FormRow, SubmitButton } from "../components";
import { useOutletContext } from "react-router-dom";
import { Form } from "react-router-dom";
import apiFetch from "../utils/apiFetch";
import { toast } from "react-toastify";

export const profileAction =
  (queryClient) =>
  async ({ request }) => {
    const formData = await request.formData();

    const image = formData.get("avatar");
    if (image && image.size > 500000) {
      toast.error("image size too large");
      return null;
    }

    try {
      await apiFetch.patch("/users/update-user", formData);
      queryClient.invalidateQueries(["user"]);
      toast.success("Profile updated successfully");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
    return null;
  };

const Profile = () => {
  const { user } = useOutletContext();
  const { name, lastName, email, location } = user;

  return (
    <Wrapper>
      <Form className="form" method="post" encType="multipart/form-data">
        <h4 className="form-title">profile</h4>
        <div className="form-center">
          <div className="form-row">
            <label htmlFor="avatar" className="form-label">
              Select an image file (max 0.5 MB)
            </label>
            <input
              type="file"
              id="avatar"
              name="avatar"
              className="form-input"
              accept="image/*"
            />
          </div>
          <FormRow type="text" name="name" defaultValue={name} />
          <FormRow
            type="text"
            name="lastName"
            labelText="last name"
            defaultValue={lastName}
          />
          <FormRow type="email" name="email" defaultValue={email} />
          <FormRow type="text" name="location" defaultValue={location} />
          <SubmitButton formBtn />
        </div>
      </Form>
    </Wrapper>
  );
};
export default Profile;
