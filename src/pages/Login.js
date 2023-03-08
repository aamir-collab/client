import React, { useEffect } from 'react';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import axios from 'axios';
import { useDispatch } from 'react-redux';
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (value) => {
    try {
      dispatch({
        type: 'LOADING',
      });
      const res = await axios.post('/api/users/login', value);
      dispatch({ type: 'HIDE_LOADING' });
      message.success('user login Succesfully');
      localStorage.setItem('auth', JSON.stringify(res.data));
      navigate('/');
    } catch (error) {
      dispatch({ type: 'HIDE_LOADING' });
      message.error('Something Went Wrong');
      console.log(error);
    }
  };

  //currently login  user
  useEffect(() => {
    if (localStorage.getItem('auth')) {
      localStorage.getItem('auth');
      navigate('/');
    }
  }, [navigate]);

  return (
    <>
      <div className="register">
        <div className="register-form">
          <h1>POS App</h1>

          <h3>Login Here</h3>
          <Form layout="vertical" onFinish={handleSubmit}>
            <Form.Item name="userid" label="User Id">
              <Input />
            </Form.Item>
            <Form.Item name="password" label="Password">
              <Input type="password" />
            </Form.Item>

            <div className="d-flex justify-content-end">
              <p>
                not a user ?<Link to="/register"> Register Here</Link>
              </p>
              <Button type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
