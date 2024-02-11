export const saveAccessToken = (token: string, expiresIn: number) => {
  const expiresDate = Number(Date.now()) + Number(expiresIn);

  localStorage.setItem('token', token);
  localStorage.setItem('expires_date', expiresDate.toString());
};

export const getAccessToken = (): string | null =>
  localStorage.getItem('token');

export const isExperisAccessToken = () => {
  const expiresDateString = localStorage.getItem('expires_date');

  const expirationTime = Number(expiresDateString);
  const currentTime = Date.now();

  return currentTime > expirationTime;
};

export const removeToken = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('expires_date');
};
