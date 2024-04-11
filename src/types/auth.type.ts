export interface LoginInfo {
  platform_id: number;
  platform: 'kakao';
}

export interface TokenResult {
  token: string;
  expires_in: number;
}

export interface User {
  nickname: string;
  role: Permissiontype;
  kakao_id: number;
}

export interface LoginResult {
  token: string;
  expires_in: number;
  user: User;
}

export type Permissiontype = 'ADMIN' | 'USER';
export const permissionLevel = {
  ADMIN: 2,
  USER: 1,
};
