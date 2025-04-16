import { Form, Tabs } from "antd";
import PageTitle from "../../components/PageTitle";
import PersonalInfo from "./profile/PersonalInfo";
import Education from "./profile/Education";
import Experience from "./profile/Experience";

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

const Profile = () => (
  <div>
    <PageTitle title="Profile" />
    <Form layout="vertical">
      <Tabs items={tabItems} />
    </Form>
  </div>
);

export default Profile;
