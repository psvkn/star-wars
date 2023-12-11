import { type ChangeEvent, useCallback, useMemo } from 'react';
import { Empty, Input, Pagination, Spin } from 'antd';
import { useSearchParams } from 'react-router-dom';
import { SearchOutlined } from '@ant-design/icons';
import debounce from 'lodash.debounce';

import { usePeopleList } from 'entities/person/model';
import { PEOPLE_DEFAULT_PAGE_SIZE } from 'entities/person/lib';
import { PeopleGrid } from '../people-grid';

import s from './people-list.module.css';

const usePaginationOptions = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') || '1';

  const currentPage = useMemo(() => {
    if (Number.isInteger(page)) {
      return Number.parseInt(page);
    }

    return 1;
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      if (newPage === 1) {
        prev.delete('page');
      } else {
        prev.set('page', newPage.toString());
      }

      return prev;
    });
  };

  return [currentPage, handlePageChange] as const;
};

export const PeopleList = () => {
  const { peopleList, isLoading, totalCount, hasError, isEmpty } =
    usePeopleList();
  const [currentPage, setCurrentPage] = usePaginationOptions();

  const [searchParams, setSearchParams] = useSearchParams();

  const renderContent = () => {
    if (isLoading) return <Spin className={s.spin} size="large" />;

    if (isEmpty) return <Empty description="No data" />;

    if (hasError) return <Empty description="Something went wrong" />;

    return <PeopleGrid data={peopleList} />;
  };

  const handleSearchChange = useCallback(
    ({ target }: ChangeEvent<HTMLInputElement>) => {
      setSearchParams(target.value ? { search: target.value } : {});
    },
    [setSearchParams],
  );

  const debouncedOnChangeHandler = useMemo(
    () => debounce(handleSearchChange, 300),
    [handleSearchChange],
  );

  return (
    <div className={s.container}>
      <Input
        onChange={debouncedOnChangeHandler}
        prefix={<SearchOutlined />}
        defaultValue={searchParams.get('search') || ''}
      />
      {renderContent()}
      <Pagination
        current={currentPage}
        onChange={setCurrentPage}
        total={totalCount}
        defaultPageSize={PEOPLE_DEFAULT_PAGE_SIZE}
        showSizeChanger={false}
        hideOnSinglePage
        disabled={isLoading}
      />
    </div>
  );
};
