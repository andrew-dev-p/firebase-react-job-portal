import { Modal, Table } from "antd";
import { useDispatch } from "react-redux";
import { ApplicationFormValues } from "../../JobDescription";
import { setLoading } from "../../../redux/alertSlice";
import { toast } from "react-toastify";
import { changeApplicationStatus } from "../../../firebase/jobService";

function AppliedCandidates({
  showAppliedCandidates,
  setShowAppliedCandidates,
  appiledCandidates,
  reloadData,
}: {
  showAppliedCandidates: boolean;
  setShowAppliedCandidates: (value: boolean) => void;
  appiledCandidates: ApplicationFormValues[];
  reloadData: (id: string) => void;
}) {
  const dispatch = useDispatch();

  const changeStatus = async (
    applicationData: ApplicationFormValues,
    status: string
  ) => {
    try {
      dispatch(setLoading(true));
      const response = await changeApplicationStatus({
        ...applicationData,
        status,
      });
      if (response.success) {
        toast.success(response.message);
        reloadData(applicationData.jobId);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "userName",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: string, record: ApplicationFormValues) => {
        return (
          <div>
            {record.status === "pending" && (
              <>
                <span
                  className="underline"
                  onClick={() => changeStatus(record, "approved")}
                >
                  Approve
                </span>
                <span
                  className="underline mx-2"
                  onClick={() => changeStatus(record, "rejected")}
                >
                  Reject
                </span>
              </>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <Modal
        title="Applied Candidates"
        open={showAppliedCandidates}
        onCancel={() => setShowAppliedCandidates(false)}
        footer={null}
        width={1000}
      >
        <Table columns={columns} dataSource={appiledCandidates} rowKey="id" />
      </Modal>
    </div>
  );
}

export default AppliedCandidates;
