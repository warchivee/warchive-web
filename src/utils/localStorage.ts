export const loadLocalStorage = (name: string): unknown => {
  const loadData = localStorage.getItem(name);

  if (loadData !== null) {
    return JSON.parse(loadData);
  }

  return null;
};

export const saveLocalstorage = (name: string, item: unknown) => {
  localStorage.setItem(name, JSON.stringify(item));
};
