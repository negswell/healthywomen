import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useActions, useValues } from 'kea'
import appLogic from '../logic/appLogic'
import _ from "lodash"
const SignUp = () => {
    const{ signUpNormal, signInGoogle,setError} = useActions(appLogic)
    const {error} =useValues(appLogic)


    const notify=() =>{
        notification['error']({
            message: error,
            duration:2

      });
      setError("")
    }
    const onFinish = (values) => {
        console.log('Received values of form: ', values);
        signUpNormal(values)
      };
      const layout = {
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 8,
        },
      };
    return ( 
        <Form
      name="login"
      {...layout}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)'
    }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined  />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit"  >
          Sign Up
        </Button>
        </Form.Item>
        <Form.Item>
        <p>or</p>
        <p>
        <Button type="danger" htmlType="button" onClick={() =>signInGoogle()} >
        Sign in with Google
        </Button></p>
        <p>
        <Link to="/"> Already have an account? Sign in here</Link></p>

        </Form.Item>
        {!_.isEmpty(error) && notify()}
    </Form>
     );
}
 
export default SignUp;