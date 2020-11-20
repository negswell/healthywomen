import React from 'react';
import { PageHeader, Button, Space,Card ,Layout} from 'antd';
import {Link}  from 'react-router-dom';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
const HomePage = () => {
  return (
 
      
    <Layout >
 
    <Content  style={{marginTop:"200px",justifyContent:"center"}} >
      <Space direction='vertical' size='large' align='center'>
        <Button type='primary' block size="large" >
        <Link to="/health-tracker">Track your Health</Link>

        </Button>
        <Button type='primary' block size="large">
          Have a Problem or Symptom ?
        </Button>
        <Button type='primary' block size="large">
          Want to know your Medicine ?
        </Button>
        <Button type='primary' block size="large">
          Predict
        </Button>
      </Space>
      </Content>
      <Footer>Health Tracker</Footer>
      </Layout>
 
  );
};

export default HomePage;
