import React from 'react';
import { Button, Space} from 'antd';
import {Link}  from 'react-router-dom';
import { useActions } from 'kea'
import appLogic from '../logic/appLogic'
import { useHistory } from 'react-router'
  const HomePage = () => {
    
    const history = useHistory()
  const{ signOut} = useActions(appLogic)
  return (
 
    
      <Space direction='vertical' size='large' align='center'  style={{marginTop:"200px",justifyContent:"center"}}>
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
        <Button type='danger' onClick={() => {
          signOut()
          history.go(0)
          }} >
          <Link to="/">Sign Out</Link>
        </Button>

      </Space>

    

     
 
  );
};

export default HomePage;
