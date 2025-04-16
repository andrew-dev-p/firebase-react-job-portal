import { Col, Form, Row } from "antd";

const PersonalInfo = () => {
  return (
    <Row gutter={[10, 10]}>
      <Col span={8}>
        <Form.Item label="First Name" name="firstName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Last Name" name="lastName">
          <input type="text" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Email" name="email">
          <input type="email" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Phone Number" name="phoneNumber">
          <input type="tel" />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item label="Portfolio Link" name="portfolioLink">
          <input type="url" />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Carrier Objective" name="carrierObjective">
          <textarea rows={4} />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item label="Address" name="address">
          <textarea rows={4} />
        </Form.Item>
      </Col>
    </Row>
  );
};

export default PersonalInfo;
