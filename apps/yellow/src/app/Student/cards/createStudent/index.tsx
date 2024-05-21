import React from 'react';
import { Form, Input, Button, message } from 'antd';
import './style.less';

interface CreateProps {
  onClose: () => void;
  onRefresh: () => void;
}

const Create: React.FC<CreateProps> = ({ onClose, onRefresh }) => {
  const [form] = Form.useForm();

  const handleSubmit = async (values: any) => {
    try {
      const response = await fetch('http://localhost:3000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        message.success('Student added successfully');
        form.resetFields();
        onClose();
        onRefresh();
      } else {
        const errorData = await response.json();
        message.error(
          `Failed to add student: ${errorData.message || 'Unknown error'}`
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        message.error(`Failed to add student: ${err.message}`);
      } else {
        message.error('Failed to add student: An unknown error occurred');
      }
    }
  };

  const validateMessages = {
    required: '${label} is required',
    types: {
      email: '${label} is not a valid email',
    },
  };

  return (
    <div className="create-form-container">
      <h1 className="heading-tag">Add New Student</h1>
      <Form
        form={form}
        layout="vertical"
        className="create-form"
        onFinish={handleSubmit}
        validateMessages={validateMessages}
        onFinishFailed={({ errorFields }) => {
          message.destroy();

          if (errorFields.length > 0 && errorFields[0].errors.length > 0) {
            message.error(errorFields[0].errors[0]);
          }
        }}
      >
        <Form.Item name="name" rules={[{ required: true }]}>
          <Input className="input-box" placeholder="Name" />
        </Form.Item>
        <Form.Item name="email" rules={[{ required: true }, { type: 'email' }]}>
          <Input className="input-box" placeholder="Email" />
        </Form.Item>
        <Form.Item name="phone" rules={[{ required: true }]}>
          <Input className="input-box" placeholder="Phone" />
        </Form.Item>
        <Form.Item name="enrollNumber" rules={[{ required: true }]}>
          <Input className="input-box" placeholder="Enroll Number" />
        </Form.Item>
        <Form.Item name="dateOfAdmission" rules={[{ required: true }]}>
          <Input className="input-box" placeholder="Date of Admission" />
        </Form.Item>
        <Form.Item>
          <div className="btn-div">
            <Button type="primary" htmlType="submit" className="submit-button">
              Submit
            </Button>
            <Button
              type="default"
              htmlType="button"
              className="reset-button"
              onClick={() => form.resetFields()}
            >
              Cancel
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
