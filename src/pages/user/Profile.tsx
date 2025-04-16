import { Form, Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import PersonalInfo from "./profile/PersonalInfo";
import Education from "./profile/Education";
import Experience from "./profile/Experience";
import { useDispatch } from "react-redux";
import { getUserProfile, updateUserProfile } from "../../firebase/userService";
import { setLoading } from "../../redux/alertSlice";
import { toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

export interface ProfileFormValues {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  portfolioLink?: string;
  carrierObjective?: string;
  address?: string;

  education?: Array<{
    degree?: string;
    institution?: string;
    percentage?: string;
  }>;

  skills?: Array<{
    technology?: string;
    rating?: string;
  }>;

  experiences?: Array<{
    company?: string;
    designation?: string;
    duration?: string;
    location?: string;
  }>;

  projects?: Array<{
    title?: string;
    description?: string;
    duration?: string;
  }>;
}

const tabItems = [
  {
    key: "1",
    label: "Personal Info",
    children: <PersonalInfo />,
  },
  {
    key: "2",
    label: "Education",
    children: <Education />,
  },
  {
    key: "3",
    label: "Experience",
    children: <Experience />,
  },
];

const Profile = () => {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState<Partial<ProfileFormValues> | null>(
    null
  );

  const onFinish = async (values: ProfileFormValues) => {
    try {
      dispatch(setLoading(true));
      const response = await updateUserProfile(values);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message || "Failed to update user profile");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user profile"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const fetchProfile = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await getUserProfile();
      if (response.success) {
        setUserData(response.data as Partial<ProfileFormValues>);
      } else {
        toast.error(response.message || "Failed to fetch user profile");
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch user profile"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div>
      <PageTitle title="Profile" />
      {userData && (
        <Form layout="vertical" onFinish={onFinish} initialValues={userData}>
          <Tabs items={tabItems} />
          <div className="d-flex justify-content-end gap-2">
            <button className="primary-outlined-btn">Cancel</button>
            <button className="primary-contained-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      )}
    </div>
  );
};

export default Profile;
