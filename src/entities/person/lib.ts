export const extractIdFromUrl = (url: string): string => {
  const [id] = url.match(/\d+(?=\/$)/)!;
  return id;
};

export const getPersonImage = (id: string) => {
  return `${import.meta.env.VITE_IMG_URL}/characters/${id}.jpg`;
};

export const PEOPLE_DEFAULT_PAGE_SIZE = 10;
