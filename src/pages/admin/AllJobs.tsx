import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  deleteJobById,
  editJobDetails,
  getAllJobs,
} from "../../firebase/jobService";
import { Table } from "antd";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import { setLoading } from "../../redux/alertSlice";
import { JobFormValues } from "../user/PostedJobs/NewEditJob";

function AllJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<JobFormValues[]>([]);

  const getData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getAllJobs();
      if (response.success) {
        setData(response.data || []);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch jobs"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const deleteJob = async (id: string) => {
    try {
      dispatch(setLoading(true));

      const response = await deleteJobById(id);
      if (response.success) {
        toast.success(response.message);
        getData();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete job"
      );
    } finally {
      setLoading(false);
    }
  };

  const changeStatus = async (id: string, status: string) => {
    try {
      dispatch(setLoading(true));
      const response = await editJobDetails({ id, status });
      if (response.success) {
        toast.success(response.message);
        getData();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update job status"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Company",
      dataIndex: "company",
    },
    {
      title: "Posted On",
      dataIndex: "postedOn",
    },
    {
      title: "Last Date to Apply",
      dataIndex: "lastDateToApply",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: string, record: JobFormValues) => (
        <div className="d-flex gap-3 align-items-center">
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
          <span
            onClick={() =>
              changeStatus(
                record.id,
                record.status === "pending" || record.status === "rejected"
                  ? "approved"
                  : "rejected"
              )
            }
            className="underline"
          >
            {record.status === "pending" || record.status === "rejected"
              ? "Approve"
              : "Reject"}
          </span>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <PageTitle title="All Jobs" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllJobs;
