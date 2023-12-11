import { Button, Form, Modal } from 'antd';
import { FC, useState } from 'react';
import { EditPersonForm } from '../form';
import { Person } from 'shared/api';
import { EditFormFields } from 'features/person-edit-form';
import { overridePeopleData } from 'entities/person/lib';

type EditPersonModalProps = {
  data: Person;
};

export const EditPersonModal: FC<EditPersonModalProps> = ({ data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [form] = Form.useForm<EditFormFields>();

  const handleOkModal = () => {
    form.submit();
  };

  const handleCancel = () => setIsOpen(false);

  const handleSubmit = (values: EditFormFields) => {
    overridePeopleData(data.url, values);
    setIsOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Edit
      </Button>
      <Modal
        open={isOpen}
        title="Edit person"
        okText="Save"
        onOk={handleOkModal}
        onCancel={handleCancel}
      >
        <EditPersonForm data={data} form={form} onSubmit={handleSubmit} />
      </Modal>
    </>
  );
};
