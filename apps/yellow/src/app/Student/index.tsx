import React, { useState } from 'react';
import { Table, Input, Button, Row, Col, Modal, Form, Input as AntInput, Space } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.less';

const { Search } = Input;

interface Student {
  key: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'Enroll Number',
    dataIndex: 'enrollNumber',
    key: 'enrollNumber',
  },
  {
    title: 'Date of Admission',
    dataIndex: 'dateOfAdmission',
    key: 'dateOfAdmission',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: string, record: Student) => (
      <Space size="middle">
        <Button style={{border:'none',color:'blue'}}  icon={<EditOutlined />} onClick={() => handleEdit(record)} />
        <Button style={{border:'none',color:'red'}} icon={<DeleteOutlined />} onClick={() => handleDelete(record)} />
      </Space>
    ),
  },
];

const data: Student[] = [
  {
    key: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '1234567890',
    enrollNumber: 'EN001',
    dateOfAdmission: '2023-01-01',
  },
  {
    key: '2',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phone: '9876543210',
    enrollNumber: 'EN002',
    dateOfAdmission: '2023-02-01',
  },
];

const handleEdit = (record: Student) => {
  console.log('Edit clicked for:', record);
  // Add your edit logic here
};

const handleDelete = (record: Student) => {
  console.log('Delete clicked for:', record);
  // Add your delete logic here
};

const Students: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const handleSearch = (value: string) => {
    setSearchText(value);
  };

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const isMobileView = window.innerWidth < 768;

  return (
    <div className="app-container">
      <Row>
        <Col span={12}>
          <h1>Student</h1>
        </Col>
        <Col span={12}>
          <div className="col-2">
            <Search
              placeholder="Search name or email"
              allowClear
              enterButton
              onSearch={handleSearch}
            />
            <Button type="primary" className="add-button" onClick={handleModalOpen}>
              Add New Student
            </Button>
          </div>
        </Col>
      </Row>
      <Table columns={isMobileView ? columns.slice(3, 3) : columns} dataSource={data} />
      <Modal
        title="Add New Student"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="cancel" onClick={handleModalClose}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleModalClose}>
            Submit
          </Button>,
        ]}
      >
        {/* Form fields for adding a new student */}
        <Form layout="vertical">
          <Form.Item label="Name" name="name">
            <AntInput />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <AntInput />
          </Form.Item>
          <Form.Item label="Phone" name="phone">
            <AntInput />
          </Form.Item>
          <Form.Item label="Enroll Number" name="enrollNumber">
            <AntInput />
          </Form.Item>
          <Form.Item label="Date of Admission" name="dateOfAdmission">
            <AntInput />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Students;
