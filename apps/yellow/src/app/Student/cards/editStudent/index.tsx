import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import './style.less';

const { Title } = Typography;

interface EditProps {
  selectedStudent: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    enrollNumber: string;
    dateOfAdmission: string;
  } | null;
  onClose: () => void;
  onRefresh: () => void;
}

const Edit: React.FC<EditProps> = ({ selectedStudent, onClose, onRefresh }) => {
  const [form] = Form.useForm();
  const [updating, setUpdating] = useState(false);

  const onFinish = async (values: any) => {
    if (!selectedStudent) {
      message.error('No student selected for editing');
      return;
    }

    try {
      setUpdating(true);
      const response = await fetch(
        `http://localhost:3000/api/students/${selectedStudent._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      if (response.ok) {
        message.success('Student updated successfully');
        onClose();
        onRefresh();
      } else {
        message.error('Failed to update student');
      }
    } catch (error) {
      message.error('Error updating student');
    } finally {
      setUpdating(false);
    }
  };

  useEffect(() => {
    if (selectedStudent) {
      form.setFieldsValue({
        name: selectedStudent.name,
        email: selectedStudent.email,
        phone: selectedStudent.phone,
        enrollNumber: selectedStudent.enrollNumber,
        dateOfAdmission: selectedStudent.dateOfAdmission,
      });
    }
  }, [selectedStudent, form]);

  return (
    <div className="create-form-container">
      <h1 className="heading-tag">Edit Student</h1>
      <Form
        layout="vertical"
        className="create-form"
        form={form}
        onFinish={onFinish}
      >
        <Form.Item name="name">
          <Input className="input-box" placeholder="Name" />
        </Form.Item>
        <Form.Item name="email">
          <Input className="input-box" placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone">
          <Input className="input-box" placeholder="Phone" />
        </Form.Item>
        <Form.Item name="enrollNumber">
          <Input className="input-box" placeholder="Enroll Number" />
        </Form.Item>
        <Form.Item name="dateOfAdmission">
          <Input className="input-box" placeholder="Date of Admission" />
        </Form.Item>
        <Form.Item>
          <div className="btn-div">
            <Button
              type="primary"
              htmlType="submit"
              className="submit-button"
              loading={updating}
            >
              Update
            </Button>
            <Button
              type="default"
              htmlType="button"
              className="reset-button"
              onClick={onClose}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Edit;
