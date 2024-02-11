import { Permissiontype, User } from 'src/types/auth.type';

export const saveUser = (user: User) => {
  localStorage.setItem('nickname', user.nickname);
  localStorage.setItem('role', user.role);
};

export const getUser = (): User | undefined => {
  const nickname = localStorage.getItem('nickname');
  const role = localStorage.getItem('role');

  if (!nickname || !role) {
    return undefined;
  }

  return {
    nickname,
    role: role as Permissiontype,
  };
};

export const deleteUser = () => {
  localStorage.removeItem('nickname');
  localStorage.removeItem('role');
};
