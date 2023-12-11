import { Person } from 'shared/api';
import { storage } from 'shared/lib';

export const extractIdFromUrl = (url: string): string => {
  const [id] = url.match(/\d+(?=\/$)/)!;
  return id;
};

export const getPersonImage = (id: string) => {
  return `${import.meta.env.VITE_IMG_URL}/characters/${id}.jpg`;
};

export const getOverridePeopleData = (): Record<string, Person> => {
  const data = storage.getItem(PEOPLE_OVERRIDE_STORAGE_KEY) || '';

  try {
    return JSON.parse(data);
  } catch (e) {
    return {};
  }
};

export const overridePeopleData = (
  key: string,
  values: Record<string, string>,
) => {
  const prevData = getOverridePeopleData();

  storage.setItem(
    PEOPLE_OVERRIDE_STORAGE_KEY,
    JSON.stringify({ ...prevData, [key]: values }),
  );
};

export const personFields = [
  { key: 'name', title: 'Name' },
  { key: 'birth_year', title: 'Birth year' },
  { key: 'gender', title: 'Gender' },
  { key: 'eye_color', title: 'Eye color' },
  { key: 'skin_color', title: 'Skin color' },
  { key: 'hair_color', title: 'Hair color' },
  { key: 'height', title: 'Height' },
  { key: 'mass', title: 'Mass' },
] as const;

export const PEOPLE_DEFAULT_PAGE_SIZE = 10;

export const PEOPLE_OVERRIDE_STORAGE_KEY = 'OVERRIDE_SWAPI_PEOPLE_RESPONSE';
