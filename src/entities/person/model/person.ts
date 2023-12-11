import { AxiosError, AxiosRequestConfig } from 'axios';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from 'react';
import { useSearchParams } from 'react-router-dom';
import { type Person, swapiApi } from 'shared/api';
import type { GetPeopleListParams } from 'shared/api/swapi/people';
import { PEOPLE_OVERRIDE_STORAGE_KEY } from '../lib';
import { storage } from 'shared/lib';

const store = {
  getSnapshot: () => storage.getItem(PEOPLE_OVERRIDE_STORAGE_KEY),
  subscribe: (listener: () => void) => {
    window.addEventListener('storage', listener);
    return () => void window.removeEventListener('storage', listener);
  },
};

export const useOverriddenPeopleData = () => {
  const overriddenData = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
  );

  return useMemo<Record<string, Person>>(() => {
    if (!overriddenData) {
      return {};
    }
    try {
      return JSON.parse(overriddenData);
    } catch (e) {
      return {};
    }
  }, [overriddenData]);
};

export const usePeopleList = () => {
  const [peopleList, setPeopleList] = useState<Person[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const overriddenData = useOverriddenPeopleData();

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
    peopleList: peopleList.map((item) => ({
      ...item,
      ...overriddenData[item.url],
    })),
    totalCount,
    hasError,
    isLoading,
  };
};

export const usePersonById = (id: number) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [person, setPerson] = useState<Person | null>(null);
  const overriddenData = useOverriddenPeopleData();

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        const { data } = await swapiApi.people.getPersonById({ id });
        setPerson(data);
      } catch (e) {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, [id]);

  return {
    isLoading,
    hasError,
    person: person ? { ...person, ...overriddenData[person.url] } : null,
  };
};
