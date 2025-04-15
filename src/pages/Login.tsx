import { Form } from "antd";
import { Link } from "react-router-dom";
import { LoginUser } from "../firebase/authService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values: { email: string; password: string }) => {
    try {
      const response = await LoginUser(values);

      if (response.success) {
        toast.success(response.message);
        navigate("/");
      } else {
        toast.error(response.message || "Login failed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className="h-screen bg-primary d-flex justify-content-center align-items-center">
      <div className="bg-white p-4 w-350">
        <h4>LOGIN</h4>
        <div className="divider" />
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email">
            <input type="email" />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <input type="password" />
          </Form.Item>
          <button type="submit" className="primary-contained-btn w-100 mt-2">
            Login
          </button>
          <Link to="/register" className="d-block mt-2">
            Not a member? Register
          </Link>
        </Form>
      </div>
    </div>
  );
};

export default Login;
