import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Person, swapiApi } from 'shared/api';
import { GetPeopleListParams } from 'shared/api/swapi/people';

export const usePeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || '1';

  const searchRef = useRef(search);

  const onLoadData = useCallback(
    async ({ search, page = 1 }: GetPeopleListParams) => {
      try {
        setHasError(false);
        setIsLoading(true);
        const { data } = await swapiApi.people.getPeopleList({
          search,
          page: page,
        });

        setPeopleList(data.results);
        setTotalCount(data.count);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    console.log(searchRef.current, search);
    if (searchRef.current !== search) {
      searchRef.current = search;
      setSearchParams({ page: '1' });
      return;
    }

    onLoadData({ search, page: Number.parseInt(page) });
  }, [search, page, onLoadData, setSearchParams]);

  return {
    peopleList,
    totalCount,
    hasError,
    isLoading,
  };
};
