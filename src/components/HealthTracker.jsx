import { PageHeader, Tabs, Button, Descriptions, Modal, Alert } from 'antd';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { firestore, auth } from './Config';
import _ from 'lodash';
import { Link, useHistory } from 'react-router-dom';
import {
  ExclamationCircleOutlined,
  LeftCircleTwoTone,
} from '@ant-design/icons';
const HealthTracker = () => {
  const { TabPane } = Tabs;
  const [medData, setData] = useState([]);
  const [key, setKey] = useState('');
  const [deleted, setDeleted] = useState(false);
  let history = useHistory();
  // function formatDate(date) {
  //     var d = new Date(date),
  //         month = '' + (d.getMonth() + 1),
  //         day = '' + d.getDate(),
  //         year = d.getFullYear();

  //     if (month.length < 2)
  //         month = '0' + month;
  //     if (day.length < 2)
  //         day = '0' + day;

  //     return [day,month,year].join('-');
  // }

  useEffect(() => {
    const temp = [];
    firestore
      .collection('medicalrecords')
      .where('email', '==', auth.currentUser.email)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach(function (doc) {
          temp.push(doc.data());
        });

        // setData(_.map(temp,(values) =>{
        //     return {...values,date:formatDate(values.date.toDate())}
        // }))
        setData(temp);
        setDeleted(false);
      })
      .catch((err) => console.error(err));
  }, [deleted]);

  function confirm() {
    Modal.confirm({
      title: 'Are you sure you want to delete this Record?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        firestore
          .collection('medicalrecords')
          .doc(auth.currentUser.email + '-' + key)
          .delete()
          .then(() => {
            setDeleted(true);
            return <Alert message='Deleted' type='success' showIcon />;
          })
          .catch((err) => {
            return <Alert message='Error' type='error' showIcon />;
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  return (
    <>
      <PageHeader
        title='Health Tracker'
        onBack={() => history.push('/')}
        // backIcon={<LeftCircleTwoTone />}
        extra={[
          <Button key='2' type='primary' shape='round'>
            <Link to='/add-record'>Add Record</Link>
          </Button>,
        ]}
      ></PageHeader>

      {!_.isEmpty(medData) && (
        <Tabs tabPosition='left' onChange={(key) => setKey(key)}>
          {_.map(medData, (values) => {
            return (
              <TabPane
                tab={values.date}
                activeKey={values.date}
                key={values.date}
              >
                <Descriptions
                  title='Medical Info'
                  bordered
                  column={1}
                  layout='vertical'
                >
                  {_.map(_.omit(values, ['email', 'date']), (el, index) => {
                    return (
                      <Descriptions.Item label={index} key={index}>
                        {el}
                      </Descriptions.Item>
                    );
                  })}
                </Descriptions>
                <Button
                  type='danger'
                  htmlType='button'
                  style={{ marginTop: '20px' }}
                  onClick={() => confirm()}
                >
                  Delete Record
                </Button>
              </TabPane>
            );
          })}
        </Tabs>
      )}
    </>
  );
};

export default HealthTracker;
