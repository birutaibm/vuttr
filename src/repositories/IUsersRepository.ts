import IUser from "models/IUser";

export default interface IUsersRepository {
  getAll: () => Promise<IUser[]>;
  save: (user: Omit<IUser, 'id'>) => Promise<IUser>;
  findById: (id: string) => Promise<IUser | undefined>;
  findByEmail: (email: string) => Promise<IUser | undefined>;
}
