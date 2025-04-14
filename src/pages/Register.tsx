import { Form } from "antd";
import { Link } from "react-router-dom";

const Register = () => {
  const onFinish = (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    console.log(values);
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
