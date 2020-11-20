import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Input, Button, notification, PageHeader } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { firestore, auth } from './Config';
const AddRecord = () => {
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    const email = auth.currentUser.email;
    const getDate = () => {
      var today = new Date();
      var dd = String(today.getDate()).padStart(2, '0');
      var mm = String(today.getMonth() + 1).padStart(2, '0');
      var yyyy = today.getFullYear();

      return dd + '-' + mm + '-' + yyyy;
    };
    const data = _.pickBy(values);
    const today = getDate();
    if (!_.isEmpty(data)) {
      _.assign(data, { email: email, date: today });
      firestore
        .collection('medicalrecords')
        .doc(email + '-' + today)
        .set(data, { merge: true })
        .then(() => {
          notification['success']({
            message: 'Data has been Saved Successfully!',
            duration: 2,
          });
        })
        .catch(() => {
          notification['error']({
            message: 'Failed to Save',
            duration: 2,
          });
        });
    }
  };
  return (
    <>
      <Form
        name='medical'
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          height: '600px',
          overflowY: 'auto',
        }}
      >
        <Form.Item name='Blood Pressure' label='Blood Pressure'>
          <Input placeholder='Blood Pressure Level' type='number' />
        </Form.Item>
        <Form.Item name='Glucose' label='Glucouse '>
          <Input placeholder='Glucose / SugarLevel' type='number' />
        </Form.Item>
        <Form.Item name='Fever' label='Fever'>
          <Input placeholder='Body Temperature' type='number' />
        </Form.Item>
        <Form.Item name='Hemoglobin' label='Hemoglobin'>
          <Input placeholder='Hemoglobin Level' type='number' />
        </Form.Item>
        <Form.Item name='Vitamin D' label='Vitamin D '>
          <Input placeholder='Vitamin D Levels' type='number' />
        </Form.Item>
        <Form.Item name='Vitamin B12' label='Vitamin B12 '>
          <Input placeholder='Vitamin B12 Levels' type='number' />
        </Form.Item>
        <Form.Item name='Vitamin C' label='Vitamin C '>
          <Input placeholder='Vitamin C Levels' type='number' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default AddRecord;
