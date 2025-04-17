import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { Table } from "antd";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { setLoading } from "../../../redux/alertSlice";
import {
  deleteJobById,
  getApplicationsByJobId,
  getPostedJobsByUserId,
} from "../../../firebase/jobService";
import { JobFormValues } from "./NewEditJob";
import { ApplicationFormValues } from "../../JobDescription";
import AppliedCandidates from "./AppliedCandidates";

function PostedJobs() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [data, setData] = useState<JobFormValues[]>([]);
  const [showAppliedCandidates, setShowAppliedCandidates] = useState(false);
  const [appiledCandidates, setAppiledCandidates] = useState<
    ApplicationFormValues[]
  >([]);

  const getData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const user = JSON.parse(localStorage.getItem("user") ?? "{}");
      const response = await getPostedJobsByUserId(user.id);
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

  const getAppliedCandidates = async (id: string) => {
    try {
      dispatch(setLoading(true));
      const response = await getApplicationsByJobId(id);
      if (response.success) {
        setAppiledCandidates(response.data as ApplicationFormValues[]);
        if (!showAppliedCandidates) {
          setShowAppliedCandidates(true);
        }
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
          <span
            className="underline"
            onClick={() => getAppliedCandidates(record.id)}
          >
            candidates
          </span>
          <i
            className="ri-delete-bin-line"
            onClick={() => deleteJob(record.id)}
          ></i>
          <i
            className="ri-pencil-line"
            onClick={() => navigate(`/posted-jobs/edit/${record.id}`)}
          ></i>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <PageTitle title="Posted Jobs" />
        <button
          className="primary-outlined-btn"
          onClick={() => navigate("/posted-jobs/new")}
        >
          New Job
        </button>
      </div>

      <Table columns={columns} dataSource={data} />

      {showAppliedCandidates && (
        <AppliedCandidates
          showAppliedCandidates={showAppliedCandidates}
          setShowAppliedCandidates={setShowAppliedCandidates}
          appiledCandidates={appiledCandidates}
          reloadData={getAppliedCandidates}
        />
      )}
    </div>
  );
}

export default PostedJobs;
