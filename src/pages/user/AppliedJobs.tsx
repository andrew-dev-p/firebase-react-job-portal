import { useState } from "react";
import { useDispatch } from "react-redux";
import PageTitle from "../../components/PageTitle";
import { Table } from "antd";
import { useEffect } from "react";
import { setLoading } from "../../redux/alertSlice";
import { getApplicationsByUserId } from "../../firebase/jobService";
import { toast } from "react-toastify";
import { ApplicationFormValues } from "../JobDescription";

function AppliedJobs() {
  const dispatch = useDispatch();

  const [data, setData] = useState<ApplicationFormValues[]>([]);

  const getData = async () => {
    try {
      dispatch(setLoading(true));

      const user = JSON.parse(localStorage.getItem("user") || "{}");

      const response = await getApplicationsByUserId(user.id);
      if (response.success) {
        setData(response.data as ApplicationFormValues[]);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch applications"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: "Job",
      dataIndex: "jobTitle",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Applied On",
      dataIndex: "appliedOn",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="Applied Jobs" />
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AppliedJobs;
