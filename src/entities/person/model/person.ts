import { AxiosError, AxiosRequestConfig } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Person, swapiApi } from 'shared/api';
import type { GetPeopleListParams } from 'shared/api/swapi/people';

export const usePeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get('search') || undefined;
  const page = searchParams.get('page') || '1';

  const onLoadData = useCallback(
    async (
      { search, page = 1 }: GetPeopleListParams,
      config?: AxiosRequestConfig,
    ) => {
      try {
        setIsEmpty(false);
        setHasError(false);
        setIsLoading(true);
        const { data } = await swapiApi.people.getPeopleList(
          {
            search,
            page: page,
          },
          config,
        );

        setPeopleList(data.results);
        setTotalCount(data.count);
        setIsEmpty(data.count === 0);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof AxiosError && e.code === 'ERR_CANCELED') {
          return;
        }
        setHasError(true);
        setIsLoading(false);
      }
    },
    [],
  );

  useEffect(() => {
    const controller = new AbortController();
    onLoadData(
      { search, page: Number.parseInt(page) },
      { signal: controller.signal },
    );

    return () => controller.abort();
  }, [search, page, onLoadData, setSearchParams]);

  return {
    isEmpty,
    peopleList,
    totalCount,
    hasError,
    isLoading,
  };
};
