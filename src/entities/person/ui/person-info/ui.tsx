import { Image, Typography } from 'antd';

import { EditPersonModal } from 'features/person-edit-form';
import {
  extractIdFromUrl,
  getPersonImage,
  personFields,
} from 'entities/person/lib';

import type { FC } from 'react';
import type { Person } from 'shared/api';

import s from './person-info.module.css';

type PersonInfoProps = {
  data: Person;
};

export const PersonInfo: FC<PersonInfoProps> = ({ data }) => {
  const id = extractIdFromUrl(data.url);

  return (
    <div className={s.container}>
      <div className={s.root}>
        <Image width={200} src={getPersonImage(id)} />
        <EditPersonModal data={data} />
      </div>
      <ul className={s.list}>
        {personFields.map(({ key, title }) => (
          <li className={s.field} key={key}>
            <Typography.Text className={s.fieldTitle}>{title}:</Typography.Text>{' '}
            <Typography.Text>{data[key]}</Typography.Text>
          </li>
        ))}
      </ul>
    </div>
  );
};
