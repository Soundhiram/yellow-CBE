import React from 'react';
import { Modal, Button } from 'antd';
import './style.less';

interface Props {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (record: any) => void;
  record: any;
}

const DeleteConfirmationModal = ({
  visible,
  onCancel,
  onConfirm,
  record,
}: Props) => {
  const name = record ? record.name : '';

  return (
    <Modal
      className="model-delete"
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          className="delete-btn"
          key="delete"
          type="primary"
          danger
          onClick={() => onConfirm(record)}
        >
          Yes
        </Button>,
        <Button className="cancel-btn" key="cancel" onClick={onCancel}>
          No
        </Button>,
      ]}
    >
      <p className="para-align">Are you sure you want to delete {name}?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
