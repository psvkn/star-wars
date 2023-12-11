import { Form, FormInstance, Input } from 'antd';

import { personLib } from 'entities/person';
import { Person } from 'shared/api';

import type { EditFormFields } from 'features/person-edit-form';
import type { FC } from 'react';

type EditPersonFormProps = {
  data: Person;
  onSubmit: (values: EditFormFields) => void;
  form: FormInstance<EditFormFields>;
};

const defaultRule = [{ required: true, message: 'Required field!' }];

export const EditPersonForm: FC<EditPersonFormProps> = ({
  data,
  form,
  onSubmit,
}) => {
  return (
    <Form
      layout="vertical"
      initialValues={data}
      form={form}
      onFinish={onSubmit}
    >
      {personLib.personFields.map(({ key, title }) => (
        <Form.Item<EditFormFields>
          key={key}
          label={title}
          name={key}
          rules={defaultRule}
        >
          <Input />
        </Form.Item>
      ))}
    </Form>
  );
};
