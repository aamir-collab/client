import { Button, Form, Input } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Register = () => {
  const handleSubmit = (value) => {
    console.log(value);
  };
  <>
    <div className="register">
      <div className="register-form">
        <h1>POS App</h1>
      
        <h3>Register Now</h3>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="userid" label="User Id">
            <Input />
          </Form.Item>
          <Form.Item name="password" label="Password">
            <Input type="password" />
          </Form.Item>

          <div className="d-flex justify-content-end">
            <p>
              <Link to="/login"> Login Here</Link>
            </p>
            <Button type="primary" htmlType="submit">
              SAVE
            </Button>
          </div>
        </Form>
      </div>
    </div>
  </>;
};

export default Register;
