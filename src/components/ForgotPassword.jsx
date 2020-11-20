import React from 'react';
import { Form, Input, Button ,notification} from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const ForgotPassword = () => {

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      
        notification['success']({
            message: 'Reset Password Email has been sent to you !',
            duration:2
      });
    }


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
      name="reset"
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
        <Input prefix={<UserOutlined />} placeholder="Email" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" >
          Reset Password
        </Button>
        </Form.Item>
        <Form.Item>
            <p>Already have an account?</p>
        <Link to="/">Sign in here</Link>

        </Form.Item>
     
    </Form>
     );
}
 
export default ForgotPassword;