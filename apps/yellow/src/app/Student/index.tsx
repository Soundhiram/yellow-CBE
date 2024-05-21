import React, { useState, useEffect } from 'react';
import { Table, Input, Button, Modal, Space, Form, message, Grid } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import './style.less';
import Create from './cards/createStudent';
import Edit from './cards/editStudent';
import DeleteConfirmationModal from './cards/Delete';
import { Breakpoint } from 'antd/es/_util/responsiveObserver';

const { useBreakpoint } = Grid;
const { Search } = Input;

interface Student {
  _id: string;
  name: string;
  email: string;
  phone: string;
  enrollNumber: string;
  dateOfAdmission: string;
}

const Students: React.FC = () => {
  const [searchText, setSearchText] = useState<string>('');
  const [students, setStudents] = useState<Student[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [modalType, setModalType] = useState<'add' | 'edit'>('add');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const screens = useBreakpoint();

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/students`);
      if (response.ok) {
        const data = await response.json();
        setStudents(data);
      } else {
        message.error('Failed to fetch students');
      }
    } catch (err) {
      message.error('Error fetching students');
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleModalOpen = () => {
    setModalType('add');
    setIsModalVisible(true);
  };

  const handleEdit = (record: Student) => {
    setSelectedStudent(record);
    setModalType('edit');
    setIsModalVisible(true);
  };

  const handleDelete = (record: Student) => {
    setSelectedStudent(record);
    setDeleteModalVisible(true);
  };

  const confirmDelete = async (record: Student) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/students/${record._id}`,
        {
          method: 'DELETE',
        }
      );
      if (response.ok) {
        message.success(`Deleted student: ${record.name}`);
        fetchStudents();
      } else {
        message.error('Failed to delete student');
      }
    } catch (err) {
      message.error('Error deleting student');
    } finally {
      setDeleteModalVisible(false);
    }
  };

  const cancelDelete = () => {
    setSelectedStudent(null);
    setDeleteModalVisible(false);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedStudent(null);
    form.resetFields();
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      responsive: ['md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Enroll Number',
      dataIndex: 'enrollNumber',
      key: 'enrollNumber',
      responsive: ['md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Date of Admission',
      dataIndex: 'dateOfAdmission',
      key: 'dateOfAdmission',
      responsive: ['md', 'lg'] as Breakpoint[],
    },
    {
      title: 'Action',
      key: 'action',
      render: (text: string, record: Student) => (
        <Space size="middle">
          <Button
            style={{ border: 'none', color: 'blue' }}
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          />
          <Button
            style={{ border: 'none', color: 'red' }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record)}
          />
        </Space>
      ),
      responsive: ['xs', 'sm', 'md', 'lg'] as Breakpoint[],
    },
  ];

  return (
    <>
      <div className="app-container">
        <div className="search-index">
          <h1>Student</h1>
          <div className="search-btn">
            <Input
              placeholder="Search name or email"
              allowClear
              onChange={handleSearch}
              className="search-bar"
            />
            {screens.md ? (
              <Button
                type="primary"
                className="add-button"
                onClick={handleModalOpen}
                style={{ marginLeft: 8 }}
              >
                Add New Student
              </Button>
            ) : screens.sm || screens.xs ? (
              <Button
                type="primary"
                className="add-button-small"
                onClick={handleModalOpen}
                style={{ marginLeft: 8 }}
              >
                Add
              </Button>
            ) : null}
          </div>
        </div>

        <Table
          columns={columns}
          dataSource={students.filter(
            (student) =>
              (student.name && student.name.includes(searchText)) ||
              (student.email && student.email.includes(searchText))
          )}
          rowKey="_id"
        />
      </div>
      <Modal
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null}
        centered
        className="model-create"
      >
        {modalType === 'add' ? (
          <Create onClose={handleModalClose} onRefresh={fetchStudents} />
        ) : (
          <Edit
            selectedStudent={selectedStudent}
            onClose={handleModalClose}
            onRefresh={fetchStudents}
          />
        )}
      </Modal>

      <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={cancelDelete}
        onConfirm={() => selectedStudent && confirmDelete(selectedStudent)}
        record={selectedStudent}
      />
    </>
  );
};

export default Students;
