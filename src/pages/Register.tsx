import { Form } from "antd";
import { Link } from "react-router-dom";
import { RegisterUser } from "../firebase/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const onFinish = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const response = await RegisterUser(values);

      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message || "Registration failed");
      }
    }
  };

  return (
    <div className="h-screen bg-primary d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 w-350">
        <h4>REGISTER</h4>
        <div className="divider" />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Name">
            <input type="text" />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button type="submit" className="primary-contained-btn w-100 mt-2">
            Register
          </button>
          <Link to="/login" className="d-block mt-2">
            Already a member? Login
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Register;
