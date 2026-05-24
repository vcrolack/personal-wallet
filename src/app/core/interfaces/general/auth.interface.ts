export interface AuthData {
  id: string;
  name: string;
  lastName: string;
  nickname: string;
  pfpUrl: string;
  role: Role;
  token: string;
}

export interface Role {
  id: number;
  name: string;
}
