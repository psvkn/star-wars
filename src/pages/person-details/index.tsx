import { Button, Result, Spin } from 'antd';
import { usePersonById } from 'entities/person/model';
import { Link, useParams } from 'react-router-dom';

import s from './person-details.module.css';

import { PersonInfo } from 'entities/person';

const PersonDetailsPage = () => {
  const { personId } = useParams();

  const { isLoading, person, hasError } = usePersonById(+personId!);

  if (isLoading) {
    return (
      <div className={s.spinContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!person && hasError) {
    return (
      <Result
        status={404}
        title={404}
        subTitle={`Person ${personId} was not found`}
        extra={
          <Link to="/">
            <Button type="primary">Back to people list</Button>
          </Link>
        }
      />
    );
  }

  if (!person) {
    return null;
  }

  return (
    <div className={s.root}>
      <Link to="..">Back</Link>
      <PersonInfo data={person} />
    </div>
  );
};

export default PersonDetailsPage;
