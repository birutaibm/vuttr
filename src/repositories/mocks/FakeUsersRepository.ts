import IUsersRepository from '../IUsersRepository';
import IUser from '../../models/IUser';

export default class FakeUsersRepository implements IUsersRepository {
  private users: IUser[];

  constructor() {
    this.users = [];
  }

  public async getAll() {
    return [ ...this.users ]
  }

  public async findById(id: string) {
    return this.users.find(user => user.id === id);
  }

  public async findByEmail(email: string) {
    return this.users.find(user => user.email === email);
  }

  public async save(user: Omit<IUser, 'id'>) {
    const lastIndex = this.users.length - 1;
    const lastId = this.users[lastIndex] ? Number(this.users[lastIndex].id) : 0;
    const id = (lastId + 1).toString();
    const newUser = { ...user, id };
    this.users.push(newUser);
    return newUser;
  }
}
