import { usePeopleList } from 'entities/person/model';
import { PeopleGrid } from 'entities/person';
import { SearchInput } from 'features/search-input/ui';

import s from './people-list.module.css';

const PeopleListPage = () => {
  const { peopleList } = usePeopleList();

  console.log(peopleList);

  return (
    <div className={s.container}>
      <SearchInput />
      <PeopleGrid data={peopleList} />
    </div>
  );
};

export default PeopleListPage;
