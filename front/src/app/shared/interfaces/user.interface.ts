export interface IUser {
  id?: number;
  roles_id: number;
  role: {
    name: string;
  };
  names: string;
  surnames: string;
  username: string;
  email?: string;
  image?: string;
  active?: boolean;
  insertDate?: string;
}
