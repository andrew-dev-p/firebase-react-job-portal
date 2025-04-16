import { Col, Form, Row } from "antd";
import { useCallback, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../components/PageTitle";
import { setLoading } from "../../../redux/alertSlice";
import { toast } from "react-toastify";
import {
  addNewJobPost,
  editJobDetails,
  getJobById,
} from "../../../firebase/jobService";

export interface JobFormValues {
  id: string;
  title: string;
  industry: string;
  location: string;
  company: string;
  salary: string;
  jobType: string;
  lastDateToApply: string;
  experience: string;
  noticePeriod: string;
  jobDescription: string;
  status?: string;
  postedByUserId?: string;
  postedByUserName?: string;
  postedOn?: string;
}

function NewEditJob() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [jobData, setJobData] = useState<JobFormValues | null>(null);
  const [form] = Form.useForm();

  const onFinish = async (values: JobFormValues) => {
    try {
      dispatch(setLoading(true));
      let response = null;
      if (params.id) {
        response = await editJobDetails({
          ...values,
          id: params.id,
        });
      } else {
        response = await addNewJobPost(values);
      }
      if (response.success) {
        toast.success(response.message);
        navigate("/posted-jobs");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save job"
      );
    } finally {
      dispatch(setLoading(false));
    }
  };

  const getData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await getJobById(params.id!);
      if (response.success) {
        setJobData(response.data as JobFormValues);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to fetch job"
      );
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, params.id, setJobData]);

  useEffect(() => {
    if (params.id) {
      getData();
    } else {
      setJobData(null);
    }
  }, [getData, params.id]);

  useEffect(() => {
    if (jobData) {
      form.setFieldsValue(jobData);
    }
  }, [jobData, form]);

  return (
    <div>
      <PageTitle title={params.id ? "Edit Job" : "Add New Job Post"} />
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={jobData || {}}
      >
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="Title"
              name="title"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Industry"
              name="industry"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="it">IT</option>
                <option value="finance">Finance</option>
                <option value="marketing">Marketing</option>
                <option value="realestate">Real Estate</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Location"
              name="location"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="india">India</option>
                <option value="usa">USA</option>
                <option value="uk">UK</option>
              </select>
            </Form.Item>
          </Col>

          <Col span={6}>
            <Form.Item
              label="Company Name"
              name="company"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Salary"
              name="salary"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Job Type"
              name="jobType"
              rules={[{ required: true, message: "required" }]}
            >
              <select name="" id="">
                <option value="">Select</option>
                <option value="fulltime">Full Time</option>
                <option value="parttime">Part Time</option>
                <option value="contract">Contract</option>
              </select>
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Last Date To Apply"
              name="lastDateToApply"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="date" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Experience"
              name="experience"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              label="Notice Period"
              name="noticePeriod"
              rules={[{ required: true, message: "required" }]}
            >
              <input type="text" />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              label="Job Description"
              name="jobDescription"
              rules={[{ required: true, message: "required" }]}
            >
              <textarea />
            </Form.Item>
          </Col>
        </Row>

        <div className="d-flex justify-content-end gap-2">
          <button
            className="primary-outlined-btn"
            onClick={() => navigate("/posted-jobs")}
          >
            Cancel
          </button>
          <button className="primary-contained-btn" type="submit">
            Save
          </button>
        </div>
      </Form>
    </div>
  );
}

export default NewEditJob;
