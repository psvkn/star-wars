import type { Person } from 'shared/api';
import type { FC } from 'react';

import s from './people-grid.module.css';
import { PersonCard } from '..';
import { extractIdFromUrl } from 'entities/person/lib';

type PeopleGridProps = {
  data: Person[];
};

export const PeopleGrid: FC<PeopleGridProps> = ({ data }) => {
  return (
    <div className={s.root}>
      {data.map((item) => (
        <PersonCard key={extractIdFromUrl(item.url)} data={item} />
      ))}
    </div>
  );
};
