import { Permissiontype, User } from 'src/services/auth/auth.interface';

export const saveUser = (user: User) => {
  localStorage.setItem('nickname', user.nickname);
  localStorage.setItem('role', user.role);
};

export const getUser = (): User => ({
  nickname: localStorage.getItem('nickname') || '',
  role: (localStorage.getItem('role') as Permissiontype) || '',
});
