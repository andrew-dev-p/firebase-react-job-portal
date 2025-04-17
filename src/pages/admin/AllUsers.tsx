import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Table } from "antd";
import { toast } from "react-toastify";
import PageTitle from "../../components/PageTitle";
import { setLoading } from "../../redux/alertSlice";
import { getAllUsers, updateUserProfile } from "../../firebase/userService";
import { ProfileFormValues } from "../user/Profile";

function AllUsers() {
  const dispatch = useDispatch();

  const [data, setData] = useState<ProfileFormValues[]>([]);

  const getData = useCallback(async () => {
    try {
      dispatch(setLoading(true));

      const response = await getAllUsers();
      if (response.success) {
        setData(response.data as ProfileFormValues[]);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch users"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const changeStatus = async (id: string, status: string) => {
    try {
      dispatch(setLoading(true));
      const response = await updateUserProfile({ id, status });
      if (response.success) {
        toast.success(response.message);
        getData();
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user status"
      );
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "UserID",
      dataIndex: "id",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (_: string, record: ProfileFormValues) => (
        <div className="d-flex gap-3 align-items-center">
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
        <PageTitle title="All Users" />
      </div>

      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default AllUsers;
