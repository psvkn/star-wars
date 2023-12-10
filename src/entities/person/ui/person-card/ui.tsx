import { Card } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import type { FC } from 'react';
import type { Person } from 'shared/api';
import { extractIdFromUrl, getPersonImage } from 'entities/person/lib';

type PersonCardProps = {
  data: Person;
};

export const PersonCard: FC<PersonCardProps> = ({ data }) => {
  const id = extractIdFromUrl(data.url);

  return (
    <Card
      actions={[
        <Link key="arrow" to={`/${id}`}>
          Go to details <ArrowRightOutlined />
        </Link>,
      ]}
      cover={<img alt={data.name} src={getPersonImage(id)} />}
    >
      <Card.Meta title={data.name} />
    </Card>
  );
};
